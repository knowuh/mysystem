// RAPHWIRE
(function(){

  ////// GLOBALS ///////////////////////////////////////////////////////////////   

  var paper; // The Global Raphael Paper object


  ////// DEFAULTS //////////////////////////////////////////////////////////////   
  var defs = {
    
    //##### MATH DEFAULTS #####//
    
    PI        : Math.PI,       // 180 degrees
    PI2       : Math.PI / 2,   // Right angle
    PI75      : Math.PI * 0.75,    

    curvature : 1,             // Curvature multiplier 
    
    //##### ARROW DEFAULTS #####//
    
    arrow: {
      name: 'ArrowModule',     
      fillOpacity   : 1.0,
      strokeOpacity : 1.0,
      headSize      : 15,
      tailWidth     : 8,
      strokeWidth   : 1.5,
      stroke        : 'black',
      fill          : 'red'    
    }
   
  };
  
  
  
  ////// HELPER-FUNCTIONS //////////////////////////////////////////////////////     

  // Merges the members of an object with an annex object's members
  var mergeMembers = function( obj, props ){
    for (var i in props) {
      obj[i] = props[i];
    }
  };  

  // Gets the distances from one point in space to another
  var dist = function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };
  
  // Pythagorean theorem for isosceles or equilateral triangle 
  var getTriangleHeight = function( x, y, x1, y1, x2, y2 ){
    var b = dist(x1, y1, x2, y2) / 2;
    var c = dist(x, y, x1, y1);
    return Math.sqrt( (c*c)-(b*b) );
  };


  ////// RAPHAEL ///////////////////////////////////////////////////////////////  

  // Accepts SVGData core objects
  var pathAssemblySuperCore = function( data ){
    var path = "";
    for( var i in data ){
      for( var j in data[i] ){
        path += j;
        for( var k=0, l=data[i][j].length; k < l; k+=2 ){
          path+= data[i][j][k]+","+ data[i][j][k+1]+" ";
        }        
        path += ' ';       
      };
    };
    return path;
  };



  //////////////////////////////////////////////////////////////////////////////
  ////// ARROW-OBJECT //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  var Arrow = function ArrowModule( props ){

    // Copy Arrow defaults into this Arrow instance
    mergeMembers( this, defs.arrow );  

    // Apply arguments to object
    this.overloadFilter.apply( this, arguments );

    // Sets initial state of object, builds paths etc
    this.set();
    
    // Create space for node links
    this.links = [];
    
    return this;
  };

  
  // Assemble all the sub-paths contained within the arrow object
  Arrow.prototype.calcPaths = function(){

    // Store the various shapes needed to draw arrow in the arrow's paths object 
    this.paths = {
      tailStroke  : this.calcTail(),
      tailFill    : this.calcTail(),
      head        : this.calcHead(),
    }

    return this;
  };

   
  // Updates the arrow object and redraws all subpaths
  Arrow.prototype.update = function(){

    // Merge any new properties, styles into the Arrow-module of the Raphael object
    this.overloadFilter.apply( this, arguments );    
    
    // Re-calculate styles based on args passed & applied to arrow object
    this.setStyles();

    // Re-calculate paths based on args passed & app;lied to arrow object
    this.calcPaths();
    
    // Loop through the Raphael SVG objects (subpaths) and update atttributes 
    for( var i in this.svgs ){
      this.svgs[i].attr({ path: this.paths[i] }).attr( this.style[i] );
    }

    return this;
  };

  Arrow.prototype.remove = function(){
    for( var i in this.svgs ){
      this.svgs[i].remove();
    }
  };

  // Calculate the path of the arrow-tail
  Arrow.prototype.calcTail = function(){
      
    // Simplify vars for reading ease
    with( this ){
      var x0 = start[0], y0 = start[1],
          x = end[0], y = end[1];
    }

    // Get the distance betwen the start and end points
    var len = dist( x0, y0, x, y );
    
    // Get the X & Y directions by comparrison
    var ydir = y0 > y ? 1 : -1 ;
    var xdir = x0 > x ? 1 : -1 ;
            
    // Get the angle from start to end
    var ang = Math.atan2( x-x0, y-y0 );  
    
    // Set x1 & y1 at half way between start and end 
    var x1 = x0 + Math.sin( ang ) * len/2;
    var y1 = y0 + Math.cos( ang ) * len/2;

    // Calculate curvature based on XY directions and length
    var curvature = ( ydir * xdir ) * Math.sqrt( len ); 

    // Apply curvature to mid-points of line
    x1 = x1 + Math.sin( ang + defs.PI2 ) * curvature * defs.curvature;
    y1 = y1 + Math.cos( ang + defs.PI2 ) * curvature * defs.curvature;
    
    // Set tail-middle to tail-end angle in arrow object
    this.ang = Math.atan2( x-x1, y-y1 );
    
    //x = x + Math.sin(this.ang+defs.PI)*this.headSize;
    //y = y + Math.cos(this.ang+defs.PI)*this.headSize;
    
    // Assemble commands into Arrow object
    var SVGData = [
      { M: [ x0, y0 ] },
      { S: [ x1, y1, x, y ] },
    ];    
    
    // Build SVG Data commands into SVG Path string
    return pathAssemblySuperCore( SVGData );
  };


  // Calculate the path of the arrow-head
  Arrow.prototype.calcHead = function(){
    
    // Simplify vars for reading ease
    with( this ){
      var x0 = start[0], y0 = start[1],
          x = end[0], y = end[1];
    }
    
    // Read angle (tail-middle to tail-end) storred in arrow objet
    var ang = this.ang;
 
    var h = getTriangleHeight( 0, 0,
      Math.sin(ang-defs.PI75) * this.headSize ,
      Math.cos(ang-defs.PI75) * this.headSize,
      Math.sin(ang+defs.PI75) * this.headSize,
      Math.sin(ang-defs.PI75) * this.headSize
    );

    x  = x + (Math.sin(ang) * (h+this.strokeWidth));
    y  = y + (Math.cos(ang) * (h+this.strokeWidth));
    x1 = x + Math.sin(ang-defs.PI75) * (this.headSize);
    y1 = y + Math.cos(ang-defs.PI75) * (this.headSize);
    x2 = x + Math.sin(ang+defs.PI75) * (this.headSize);
    y2 = y + Math.cos(ang+defs.PI75) * (this.headSize);
 
    // Build the SVG data object
    var SVGData = [
      { M: [ x, y   ] },
      { L: [ x1, y1 ] },
      { L: [ x2, y2 ] },
      { L: [ x, y   ] },
    ];
    
    // Convert the SVG data object to an SVG path string
    return pathAssemblySuperCore( SVGData );  
  };     

 
  // Re calculate and set the Arrow's path, called from the context of the Raphael Ojbect
  Arrow.prototype.set = function( props ){
    
    // Merge any new properties, styles into the Arrow-module of the Raphael object
    this.overloadFilter.apply( this, arguments );
    
    // Creaye the SVGS object, which store Raphael-injected SVG elements
    this.svgs = {};
    
    // Calculate all the path data into path strings
    this.calcPaths();

    // Calculate the styles of the object based on passsed properties
    this.setStyles();
    
    // Step through paths object & attach new Raphael SVG elements into the Arrow.svg {object-literal}
    for( var i in this.paths ){
      this.svgs[i] = paper.path( this.paths[i] ).attr( this.style[i] );
    }

    return this;   
  };


  // Set the styles of the Arrow object based on props passed, or defs.values
  Arrow.prototype.setStyles = function(){

    this.style = {

      // Strokes are draw on the outside, so total width is affected by strokeWidth
      tailStroke:{
        'stroke-width'    : this.tailWidth+this.strokeWidth,
        
        // Cap t+this.tailWidthhe ends of the tail
        'stroke-linecap'  : 'square',
         stroke           : this.stroke,
        'fill-opacity'    : this.fillOpacity,
        'stroke-opacity'  : this.strokeOpacity
      },

      // The fill width is the total width - the stroke width
      tailFill:{
        'stroke-width'    : this.tailWidth-this.strokeWidth,
        'stroke-linecap'  : 'square',
         stroke           : this.fill,
        'stroke-opacity'  : this.fillOpacity,
        'fill-opacity'    : this.strokeOpacity
      },

      head:{
        'stroke-width'    : this.strokeWidth,
                 
         // Pull stroke and fill colors from object's properties / originally pulled from defs
         stroke           : this.stroke,
         fill             : this.fill,
        'fill-opacity'    : this.fillOpacity,
        'stroke-opacity'  : this.strokeOpacity
      }
    };

    return this;
  };


  // Handle overloading for instancing with prop object or start/end-point number arguments
  Arrow.prototype.overloadFilter = function( props ){
    
    if( typeof props === 'object' ){

      // Copy passed property arguments to new instance's member variables, ( will over-write copied defaults )
      mergeMembers( this, props );

    } else if ( typeof props === 'number' ){
     
      // Set the start and end points
      this.start  = [ arguments[0], arguments[1] ];
      this.end    = [ arguments[2], arguments[3] ];

      // If a props literal object is passed as 5th argument, merge props to member vars
      if( typeof arguments[4] === 'object' ){
        mergeMembers( this, arguments[4] );
      }

    }
   
    return this; 
  };
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  ////// RAPHWIRE //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  var Raphwire = function(){ 
  
    this.paperElem = $('#paper')[0];  
    this.width = $(this.paperElem).width();
    this.height = $(this.paperElem).height();
    
    paper = new Raphael( this.paperElem, this.width, this.height );    
    
    this.arrows = [];
    var that = this;
    
    var mouseX = 0, mouseY = 0, mouseDown = false, mouseDownX = 0, mouseDownY = 0;
    curElement = document.getElementById('paper');
    
    var ghostArrow;
         
    function attach(elem, type, fn) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
      } else {
        elem.attachEvent("on" + type, fn);
      }
    };
      
    attach(curElement, "mousemove", function(e) {
      var scrollX = (window.scrollX !== null && typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset;
      var scrollY = (window.scrollY !== null && typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset;
      mouseX = e.clientX - curElement.offsetLeft + scrollX;
      mouseY = e.clientY - curElement.offsetTop + scrollY;
      if(mouseDown){
        ghostArrow.update(mouseDownX,mouseDownY,mouseX,mouseY);     
      }
    });
  
    attach(curElement, "mousedown", function(e) {
      //console.log(mouseX, mouseY);
      if(!mouseDown){
        mouseDown = true;
        mouseDownX = mouseX, mouseDownY = mouseY;
        ghostArrow = new Arrow(mouseDownX,mouseDownY,mouseX,mouseY,{fill:'000'});
      }
    });

    attach(curElement, "mouseup", function(e) {
      //console.log(mouseX, mouseY);
      if(mouseDown){
        ghostArrow.remove();
        that.arrows[that.arrows.length] = new Arrow(mouseDownX,mouseDownY,mouseX,mouseY);
        mouseDown = false;
      }
    });            
    
    return this;
  };
 
 
  //////////////////////////////////////////////////////////////////////////////
  ////// TEST CODE /////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  
  var arrows = [];  
  
  var init = function(){
    
    raphwire = new Raphwire();
    var north = new Arrow(200,200,200,100, {fill:'#fa0'});


  };
  var loader = document.addEventListener( 'DOMContentLoaded', function(){ init() }, false );
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  
  
    
})();

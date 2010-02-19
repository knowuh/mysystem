// RAPHWIRE
(function(){

  ////// GLOBALS ///////////////////////////////////////////////////////////////   

  var paper; // The Raphael Paper object


  ////// DEFAULTS //////////////////////////////////////////////////////////////   
  var defs = {
    
    //##### MATH DEFAULTS #####//
    rightAngle: Math.PI / 2,
    
    //##### ARROW DEFAULTS #####//
    arrow: { 
      
      name: 'ArrowModule',
      
      // Arrow style
      style: {
        'stroke-width': 5,
         stroke: 'red'
      }
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



  ////// RAPHAEL ///////////////////////////////////////////////////////////////  

  // Accepts SVGData core objects
  var pathAssemblySuperCore = function( data ){
    var path = "";
    for( var i in data ){
      for( var j in data[i] ){
        path += j;
        /* TO ADD:
             1) functionality for single var path commmands
             2) inting, floating and dec-place limiting
        */
        for( var k=0, l=data[i][j].length; k < l; k+=2 ){
          path+= data[i][j][k]+","+ data[i][j][k+1]+" ";
        }        
        path += ' ';       
      };
    };
    return path;
  };


  ////// ARROW-OBJECT //////////////////////////////////////////////////////////
  var Arrow = function ArrowModule( props ){

    // Copy Arrow defaults into this Arrow instance
    mergeMembers( this, defs.arrow );       
    
    this.overloadFilter.apply( this, arguments );
    
    // Calculate the path of the arrow based on start[] end[] points passed
    this.calcPath();  
  
    // Create Raphael object built from this instance of Arrow object
    this.raphaelObject = paper.path( this.path );
    
    // Link back to arrow inside raphael object for easy access to object module
    this.raphaelObject.module = this;
    
    // Attach set as an interface to this module on the  
    this.raphaelObject.set = this.set;
    
    // Return the Raphael object complete with applied styles
    return this.raphaelObject.attr( this.style );
  
  };  
  
  // Handle overloading for instancing with prop object or start/end-point numbers
  Arrow.prototype.overloadFilter = function( props ){
      
    if( typeof props === 'object' ){

      // Copy passed property arguments to new instance's member variables, ( will over-write copied defaults )
      mergeMembers( this, props );

    } else if ( typeof props === 'number' ){
     
      // Set the start and end points
      this.start  = [ arguments[0], arguments[1] ];
      this.end    = [ arguments[2], arguments[3] ];

      // If a props object is passed as 5th argument, merge props to member vars
      if( typeof arguments[5] === 'object' ){
        mergeMembers( this, arguments[5] );
      }
    
    }
    
    return this;
  
  };
  
   
  // Calculate the path of the arrow
  Arrow.prototype.calcPath = function(){
      
    // Set some readable variables from Arrow object's member variables
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
    x1 = x0 + Math.sin( ang ) * len/2;
    y1 = y0 + Math.cos( ang ) * len/2;

    // Calculate curvature based on XY directions and length
    var curvature = ( ydir * xdir ) * Math.sqrt( len );

    // Apply curvature to mid-points of line
    x1 = x1 + Math.sin( ang + defs.rightAngle ) * curvature;
    y1 = y1 + Math.cos( ang + defs.rightAngle ) * curvature;
                   
    // Assemble commands into Arrow object
    this.SVGData = [
      { M: [ x0, y0 ] },
      { S: [ x1, y1, x, y ] },
    ];   

    // Build object's assembled path into an SVG path string 
    this.path = pathAssemblySuperCore( this.SVGData );

    return this;

  };
 
  // Re calculate and set the Arrow's path, called from the context of the Raphael Ojbect
  Arrow.prototype.set = function( props ){
    
    // Merge any new properties, styles into the Arrow-module of the Raphael object
    this.module.overloadFilter.apply( this.module, arguments );
    
    // Re-calculate the Arrow's path
    this.module.calcPath();
    
    // Update the DOM attributes for the SVG object and return the Raphael instance
    return this.attr({ path: this.module.path }).attr( this.module.style );

  };

 
 
  ////// TEST CODE /////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  var init = function(){
    var paperElem = $('#paper')[0];  
    var width = $(paperElem).width(), height = $(paperElem).width();
    paper = new Raphael( paperElem, width, height );    

    var arrow = new Arrow(100,100,200,50);
       
    /////////
    function attach(elem, type, fn) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
      } else {
        elem.attachEvent("on" + type, fn);
      }
    };

    var mouseX = 0, mouseY = 0;
    var curElement = document.getElementById('paper');
      
    attach(curElement, "mousemove", function(e) {
      var scrollX = (window.scrollX !== null && typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset;
      var scrollY = (window.scrollY !== null && typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset;
      mouseX = e.clientX - curElement.offsetLeft + scrollX;
      mouseY = e.clientY - curElement.offsetTop + scrollY;    

      arrow.set(100,100,mouseX,mouseY);           

    });
  
  
  };
  var loader = document.addEventListener( 'DOMContentLoaded', function(){ init() }, false );
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  

  ////// MYOBJECTS /////////////////////////////////////////////////////////////
  // An array to store all the objects the students drage to the work-area
  myObjects = [];

  // MySystem Object Class 
  MyObject = function MyObject( props ){
    this.applyProps( props );
    return this;
  };
  
  MyObject.prototype = {
    id        : myObjects.length + '_' + new Date().getTime(),
    text      : '',
    imageURL  : '',
    inputs    : [],
    outputs   : [],
    links     : [], // Links to story sections etc
    x         : 0,
    y         : 0,
  };
  
  MyObject.prototype.applyProps = function applyProps( props ){
    mergeMembers( this, props );
  }; 
  //a = new MyObject({x:100, y:100 });
  //console.log( a );
 
  
    
})();

// RAPHWIRE
(function(){

  ////// DEFAULTS //////////////////////////////////////////////////////////////   
  var defs = {
    rightAngle: Math.PI / 2
  }
  
  
  
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
        for( var k=0, l=data[i][j].length; k < l; k+=2 ){
          path+= data[i][j][k]+","+ data[i][j][k+1]+" ";
        }        
        path += ' ';       
      };
    };
    return path;
  }


  ////// ARROW-OBJECT //////////////////////////////////////////////////////////
  var Arrow = function Arrow( props ){
    mergeMembers( this, props );
    this.calcPath();
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

 
  ////// TEST CODE /////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  var init = function(){
    var paperElem = $('#paper')[0];  
    var width = $(paperElem).width(), height = $(paperElem).width();
    var paper = new Raphael( paperElem, width, height );    

    var myArrow = new Arrow({ start:[100,100], end:[500,100] });
    
    paper.path(myArrow.path);
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

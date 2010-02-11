// RAPHWIRE
(function(){

  ////// RAPHAEL ///////////////////////////////////////////////////////////////
  var svg = {
    X: 0, Y: 0,
    M: function(vals){
      return 'M'+vals[0]+' '+vals[1];
    },
    Q: function(vals){
      return 'Q'+vals[0]+','+vals[1]+' '+vals[2]+','+vals[3];
    }
  };

  var path = function( commands ){
    var path = '';
    for(var i in commands){
      path += svg[i]( commands[i] ) + ' ';
    }
    return path;
  };
 
  var init = function(){
    var paperElem = $('#paper')[0];    
    var width = $(paperElem).width(), height = $(paperElem).width();
    var paper = new Raphael( paperElem, width, height );     
    console.log( paper) ;
    
    
    
    var arrowPath = path({ M:[100,100], Q:[150,100,200,150], Q:[200,50,250,100] });
    
    var arrow = paper.path(arrowPath);
    //arrow.translate(10,10);
    
  };
  var loader = document.addEventListener( 'DOMContentLoaded', function(){ init() }, false );

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
    for( var i in props ){
      this[ i ] = props[ i ];
    }
  };

  
  ////// TEST CODE /////////////////////////////////////////////////////////////
  
  a = new MyObject({x:100, y:100 });
  console.log( a );
  
    
})();

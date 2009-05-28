

/**
 */
var MySystemData = function () {
  this.modules = [];
  this.instances = [];
  this.dataEndPoint = "http://blah";
  
  this.setData = function (data,instances,addTerminals) {
    console.log("set modules called");
    if (addTerminals) {
      data.each( function(d) {
        d.terminals =  [this.defaultInTerminal,this.defaultOutTerminal];
      });
    }
    this.modules = data;
  },
  
  this.addInstance = function(instance) {
    this.instances.push(instance);
  }
  
  this.saveData = function() {
    alert("saving data!");
    // ha!
  } 
}

MySystemData.defaultTerminals = function() {
  return [{
       "wireConfig": {
         "drawingMethod": "bezierArrows"
       },
       "name": "Drag me to another object's terminal to show energy transfer",
       "direction": [0, -1],
       "offsetPosition": {
       "left": 20,
       "top": -25
       },
       "ddConfig" : {
           "type": "input",
           "allowedTypes": ["input", "output"]
       }
   },{
       "wireConfig": {
           "drawingMethod": "bezierArrows"
       },
       "name": "Drag me to another object's terminal to show energy transfer",
       "direction": [0, 1],
       "offsetPosition": {
           "left": 20,
           "bottom": -25
       },
       "ddConfig": {
           "type": "output",
           "allowedTypes": ["input", "output"]
       }  
   }];
}
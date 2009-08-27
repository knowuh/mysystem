
/**
 *
 */
var MySystemData = Class.create({
  initialize:function() {
    this.modules = [];
  this.instances = [];
  },

  addModule: function(module,addTerminals) {
    if (addTerminals) {
      module.terminals = MySystemData.defaultTerminals();   
    }
    this.modules.push(module)
  },

  setModules: function (_modules,addTerminals) {
    this.modules = [];
    // debug("set modules called");
    _modules.each(function(m){ 
      this.addModule(m,addTerminals); 
    }.bind(this));
  },
  
  setInstances: function(_instances) {
    this.instances = [];
    _instances.each(function(i){
      this.addInstance(i);
    }.bind(this))
  },
  
  addInstance : function(instance) {
    this.instances.push(instance);
  },
  
  setData: function (modules,instances,addTerminals) {
    this.setModules(modules,addTerminals);
    this.setInstances(instances);
  }
});


MySystemData.defaultTerminals = function() {
  return [{
       "wireConfig": {
         "drawingMethod": "bezierArrows"
       },
       "name": "Terminal1",
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
       "name": "Terminal2",
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
};
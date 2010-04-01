(function () {
  MySystemData = function() {
    this.initialize();
  }
  
  MySystemData.prototype.initialize = function() {
    this.modules = [];
    this.instances = [];
  };
  
  MySystemData.prototype.addModule = function (module,addTerminals) {
    if (addTerminals) {
      if (!module.terminals) {
        module.terminals = MySystemData.defaultTerminals();   
      }
    }
    this.modules.push(module);
  };
  
  MySystemData.prototype.setModules = function (_modules,addTerminals) {
    this.modules = [];
    // debug("set modules called");
    var module;
    for (module in _modules) {
      this.addModule(_modules[module],addTerminals);
    }
  };
  
  MySystemData.prototype.setInstances = function (_instances) {
    this.instances = [];
    // debug("set modules called");
    var instance;
    for (instance in _instances) {
      this.addInstance(_instances[instance]);
    }
  };
  
  MySystemData.prototype.addInstance = function (instance) {
    this.instances.push(instance);
  };
  
  MySystemData.prototype.setData = function (modules,instances,addTerminals) {
    this.setModules(modules,addTerminals);
    this.setInstances(instances);
  };
  
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
             "bottom": -50
         },
         "ddConfig": {
             "type": "output",
             "allowedTypes": ["input", "output"]
         }  
     }];
  };
  
})();

// /**
//  *
//  */
// var MySystemData = Class.create({
//   initialize:function() {
//     this.modules = [];
//   this.instances = [];
//   },
// 
//   addModule: function(module,addTerminals) {
//     
//   },
// 
//   setModules: function (_modules,addTerminals) {
// 
//   },
//   
//   setInstances: function(_instances) {
//     this.instances = [];
//     _instances.each(function(i){
//       this.addInstance(i);
//     }.bind(this))
//   },
//   
//   addInstance : function(instance) {
//     this.instances.push(instance);
//   },
//   
//   setData: function (modules,instances,addTerminals) {
//     this.setModules(modules,addTerminals);
//     this.setInstances(instances);
//   }
// });



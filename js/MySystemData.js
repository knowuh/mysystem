/**
 */
var MySystemData = function () {
  this.modules = [],
  this.instances = [],
  this.dataEndPoint = "http://blah",
  
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

 
var testData = [
  {
    name: "Energy Form Label",
    xtype: "MySystemWireLabel"
  },
  {
    name: "world",
    xtype: "MySystemContainer",
    image: "./images/world-transp.png",
    icon: "./images/world-transp.png"
  },
  {
    name: "egg", 
    image: "./images/egg-transp-70.png",
    xtype: "MySystemContainer",
    icon: "./images/egg-transp-70.png"
  },
  {
    name: "burner", 
    image: "./images/burner-transp-70.png",
    xtype: "MySystemContainer",
    icon: "./images/burner-transp-70.png"
  },
  {
    name: "pot", 
    image: "./images/pot-70.png",
    xtype: "MySystemContainer",
    icon: "./images/pot-70.png"
  },
  {
    name: "power-plant", 
    image: "./images/power-plant-70.png",
    xtype: "MySystemContainer",
    icon: "./images/power-plant-70.png"
  },
  {
    name: "water", 
    image: "./images/water-70.png",
    xtype: "MySystemContainer",
    icon: "./images/water-70.png"
  }
];

var MySystemDemo = {
  data : new MySystemData(),
  /**
  * @method init
  * @static
  */
  init: function() {
      try {  
        this.data.setData(testData,[],true);
        this.editor = new MySystemEditor(this.data);
        // this.editor.onHelp();
      }
      catch (e){
        // debug("ooopps! " + e)
      }
  },
  

  /**
  * Execute the module in the "ExecutionFrame" virtual machine
  * @method run
  * @static
  */
  run: function() {
      var ef = new ExecutionFrame(this.editor.getValue());
      ef.run();
  }
};
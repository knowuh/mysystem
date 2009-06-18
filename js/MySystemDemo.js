var testData = [
  {
    name: "Label",
    xtype: "MySystemWireLabel"
  },
  {
    name: "World",
    xtype: "MySystemContainer",
    image: "./images/world-transp.png",
    icon: "./images/world-transp.png"
  },
  {
    name: "Turkey", 
    image: "./images/turkey-transp.png",
    xtype: "MySystemContainer",
    icon: "./images/turkey-transp.png"
  },
  {
    name: "Tomato", 
    image: "./images/tomato.png",
    xtype: "MySystemContainer",
    icon: "./images/tomato.png"
  },
  {
    name: "Sun", 
    image: "./images/sun.png",
    xtype: "MySystemContainer",
    icon: "./images/sun.png"
  },
  {
    name: "Person Standing", 
    image: "./images/standing-person.png",
    xtype: "MySystemContainer",
    icon: "./images/standing-person.png"
  },
  {
    name: "Person Running", 
    image: "./images/running-person.png",
    xtype: "MySystemContainer",
    icon: "./images/running-person.png"
  },
  {
    name: "Oven", 
    image: "./images/oven.png",
    xtype: "MySystemContainer",
    icon: "./images/oven.png"
  },
  {
    name: "Molecule", 
    image: "./images/molecule-transp.png",
    xtype: "MySystemContainer",
    icon: "./images/molecule-transp.png"
  },
  {
    name: "Wheat", 
    image: "./images/wheat.png",
    xtype: "MySystemContainer",
    icon: "./images/wheat.png"
  },
  {
    name: "Sandwich", 
    image: "./images/sandwich.png",
    xtype: "MySystemContainer",
    icon: "./images/sandwich.png"
  },
  {
    name: "Egg", 
    image: "./images/egg-transp-70.png",
    xtype: "MySystemContainer",
    icon: "./images/egg-transp-70.png"
  },
  {
    name: "Burner", 
    image: "./images/burner-transp-70.png",
    xtype: "MySystemContainer",
    icon: "./images/burner-transp-70.png"
  },
  {
    name: "Pot", 
    image: "./images/pot-70.png",
    xtype: "MySystemContainer",
    icon: "./images/pot-70.png"
  },
  {
    name: "Power-plant", 
    image: "./images/power-plant-70.png",
    xtype: "MySystemContainer",
    icon: "./images/power-plant-70.png"
  },
  {
    name: "Water", 
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
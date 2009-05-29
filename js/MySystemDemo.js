var testData = [
  {
    name: "Energy Form Label",
    xtype: "MySystemWireLabel"
  },
  {
    name: "Water",
    xtype: "MySystemContainer",
    image: "./images/water-70.png",
    icon: "./images/water-70.png"
  },
  {
    name: "egg", 
    image: "./images/egg-transp-70.png",
    xtype: "MySystemContainer",
    icon: "./images/egg-transp-70.png"
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
        console.log('starting up ...');
        this.data.setData(testData,[],true);
        console.log("data is set");
        this.editor = new MySystemEditor(this.data);
        console.log("Editor Started");
        // this.editor.onHelp();
      }
      catch (e){
        console.log("ooopps! " + e)
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
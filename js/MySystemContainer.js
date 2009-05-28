var defaultTerminals = function() {
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

var testData = [
  {
    name: "Energy Form Label",
    xtype : "MySystemWireLabel"
  },
  {
    name  : "Water",
    xtype : "MySystemContainer",
    image : "./images/water-70.png",
    icon  : "./images/water-70.png",
    terminals : defaultTerminals()
  },
  {
    name  : "egg", 
    image : "./images/egg-transp-70.png",
    xtype : "MySystemContainer",
    icon  : "./images/egg-transp-70.png",
    terminals : defaultTerminals()
  }
];


/**
 * Module-Type represented by an image
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
MySystemContainer = function(options, layer) {
   MySystemContainer.superclass.constructor.call(this, options, layer);
   this.name = options.name || "MySystem Container";
   this.icon = options.icon;
   this.dClick = options.dClick || function () { console.log("double clicked (default handler)"); };
};

YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  lastClick : 0,  
  doubleClickMS : 200,

  time : function () {
    d = new Date();
    return d.getTime();
  },
  
  /**
   * Called when the user made a mouse down on the container and sets the focus to this container (only if within a Layer)
   * @method onMouseDown
   */
  onMouseDown: function() {
    if (this.time() - this.lastClick < this.doubleClickMS)  {
      this.onDblClick();
    }
    this.lastClick = this.time();

    if (this.click) {
      console.log("click");
      if(this.layer) {
        if(this.layer.focusedContainer && this.layer.focusedContainer != this) {
          this.layer.focusedContainer.removeFocus();
        }
        this.setFocus();
        this.layer.focusedContainer = this;
      }
    }
  },  
  
  onDblClick : function() {
    console.log("dbl-click captain");
    if (this.dClick) {
      this.dClick();
    }
  } 
});



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



var MySystemDemo = {
  data : new MySystemData(),
  /**
  * @method init
  * @static
  */
  init: function() {
      try { 
        console.log('starting up ...');
        this.data.setData(testData);
        console.log("data is set");
        this.editor = new MySystemEditor(this.data);
        console.log("Editor Started");
        this.editor.onHelp();
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




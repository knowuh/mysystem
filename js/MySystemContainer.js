var gSubSys = {};

/**
 * MySystem Container. Has an image. and double_click beahvor.
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
   this.fields = options.fields || {'energy': 10};
   this.has_sub = false;
   this.subSystem = null;
   if (options.subsystem != null) {
	   console.log("initializing subsystem");
	   this.subSystem = new WireIt.Layer(this.options);
	   console.log("Successfully initialized layer");
	   this.subSystem.setWiring(options.subsystem);
	   console.log("successfully set wiring");
	   gSubSys = this.subSystem;
   }
   this.options.xtype = "MySystemContainer";
   this.propEditor = null;
   this.openEditorFor = 
   // Adds a handler for mousedown so we can change layers in our editor
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
   YAHOO.util.Event.addListener(this.el, "mouseup", this.onMouseUp, this, true);   
};


YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  onMouseUp: function(source) {
    MySystemContainer.openPropEditorFor.fire(this);
  },
  
  onDblClick: function(source) {
    if (this.has_sub) {
      MySystemContainer.openContextFor.fire(this);
    }
  },
  
  getConfig: function() {
	  MySystemContainer.superclass.getConfig.call();
	  if (this.subSystem != null) {
		  console.log("saving subsystem config");
		  this.options.subsystem = this.subSystem.getWiring();
	  }
	  return this.options;
  }
});

// register some events for others to subscribe to:
MySystemContainer.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenEditorFor");
MySystemContainer.openContextFor = new YAHOO.util.CustomEvent("openContextFor");









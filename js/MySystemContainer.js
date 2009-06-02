var gSubSys = {};

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
   this.openEditorFor = 
   // Adds a handler for mousedown so we can notice the layer
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
};

YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  onDblClick: function(source) {
    console.log("dbl-click for " + this.name + " " + source.name + source);
    MySystemContainer.openEditorFor.fire(this);
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
MySystemContainer.openEditorFor = new YAHOO.util.CustomEvent("OpenEditorFor");












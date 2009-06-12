/**
 * MySystem Container. Has an image. and double_click beahvor.
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
LabeledWire = function(options, layer) {
   MySystemContainer.superclass.constructor.call(this, options, layer);
   this.name = options.name || "MySystem Container";
   this.icon = options.icon;
   this.fields = options.fields || {'energy': 10};
   this.has_sub = options.has_sub || false;
   this.subSystem =  null;
   if (options.subsystem_options != null) {
	   // console.log("initializing subsystem");
	   this.subSystem = new WireIt.Layer(options.subsystem_options);
	   // console.log("Successfully initialized layer");
	   this.subSystem.setWiring(options.subsystem_wiring);
	   // console.log("successfully set wiring");
   }
   this.options.xtype = "MySystemContainer";
   this.propEditor = null;
   this.openEditorFor = 
   // Adds a handler for mousedown so we can change layers in our editor
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
   YAHOO.util.Event.addListener(this.el, "mouseup", this.onMouseUp, this, true);   
};


YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  
});






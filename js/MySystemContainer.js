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
   this.openEditorFor = 
   // Adds a handler for mousedown so we can notice the layer
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
};

YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  onDblClick: function(source) {
    console.log("dbl-click for " + this.name + " " + source.name + source);
    MySystemContainer.openEditorFor.fire(this)
  }
});
MySystemContainer.openEditorFor = new YAHOO.util.CustomEvent("OpenEditorFor");












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
   this.subSystem = null;
   this.propEdit = new MySystemPropEditor(this, {domID: "prop_editor"});
   this.openEditorFor = 
   // Adds a handler for mousedown so we can change layers in our editor
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
};


YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  // show some fields for editing..
  openPropertyEditor: function() {
    this.propEdit.show();
  },
  onDblClick: function(source) {
    console.log("dbl-click for " + this.name + " " + source.name + source);
    // MySystemContainer.openEditorFor.fire(this)
    this.openPropertyEditor();
  }

});
MySystemContainer.openEditorFor = new YAHOO.util.CustomEvent("OpenEditorFor");










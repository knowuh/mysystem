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
   this.subSystem = null;
   this.propEditor = null;
   this.openEditorFor = 
   // Adds a handler for mousedown so we can change layers in our editor
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
   YAHOO.util.Event.addListener(this.el, "mouseup", this.onMouseUp, this, true);   
};


YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  // show some fields for editing..
  // openPropertyEditor: function() {
  //   if(this.propEditor != null) {
  //     this.propEditor.show(this);
  //   }
  //   else {
  //     console.log('no prop editor for me..')
  //   }
  // },
  onMouseUp: function(source) {
    MySystemContainer.openPropEditorFor.fire(this);
  },
  
  onDblClick: function(source) {
    if (this.subsystem) {
      MySystemContainer.openContextFor.fire(this);
    }
  }

});
MySystemContainer.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenEditorFor");
MySystemContainer.openContextFor = new YAHOO.util.CustomEvent("openContextFor");









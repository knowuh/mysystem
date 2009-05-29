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
};

YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  lastClick : 0,  
  doubleClickMS : 200,
  time : function () {
    d = new Date();
    return d.getTime();
  },
  
  /**
   * Called when the user made a mouse down on the container and sets 
   * the focus to this container (only if within a Layer)
   *
   * Tries to determine a double-click event.
   *
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
   
  onDblClick: function() {
    console.log("dbl-click");
    this.doubleClick();
    MySystemContainer.openEditorFor.fire(this);
  }
});
MySystemContainer.openEditorFor = new YAHOO.util.CustomEvent("OpenEditorFor");












/**
 * Container represented by an image
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
WireIt.ImageContainer = function(options, layer) {
   WireIt.ImageContainer.superclass.constructor.call(this, options, layer);
};

YAHOO.lang.extend(WireIt.ImageContainer, WireIt.Container, {
   
 
   /**
    * @method setOptions
    * @param {Object} options the options object
    */
   setOptions: function(options) {
      WireIt.ImageContainer.superclass.setOptions.call(this, options);
      
      this.options.image = options.image;
      this.options.xtype = "WireIt.ImageContainer";
      
      this.options.className = options.className || "WireIt-Container WireIt-ImageContainer";
      
      // Overwrite default value for options:
      this.options.resizable = (typeof options.resizable == "undefined") ? false : options.resizable;
      this.options.ddHandle = (typeof options.ddHandle == "undefined") ? false : options.ddHandle;
   },
   

   /**
    * @method render
    */
   render: function() {
      WireIt.ImageContainer.superclass.render.call(this);
      YAHOO.util.Dom.setStyle(this.bodyEl, "background-image", "url("+this.options.image+")");
      var newImg = new Image();
      newImg.src = this.options.image;
      var height = newImg.height;
      var width = newImg.width;
      this.el.style.height=height+"px";
      this.el.style.width=width+"px";
      this.bodyEl.style.width=width+"px"
      this.bodyEl.style.height=height+"px"
   },
   
   /**
    * Called when the user made a mouse down on the container and sets the focus to this container (only if within a Layer)
    * @method onMouseDown
    */
   onMouseDown: function() {
      if (this.click) // huh? I swear it was like this!
      if(this.layer) {
         if(this.layer.focusedContainer && this.layer.focusedContainer != this) {
            this.layer.focusedContainer.removeFocus();
         }
         this.setFocus();
         this.layer.focusedContainer = this;
      }
   }
   
});
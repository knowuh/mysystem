/**
 * MySystem Container. Has an image. and double_click bahavior.
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
MySystemNote = function(options, layer) {
   MySystemNote.superclass.constructor.call(this, options, layer);
   this.title = options.name || "Note";
   this.options.fields = options.fields || {'name': this.title, 'content': "blank"};
   this.icon = options.icon;
   this.options.xtype = "MySystemNote";

   if (this.options.position) {
     $(this.el).css({
       position: 'absolute',
       left: this.options.position[0],
       top: this.options.position[1]
     });
     
    }
   // Adds a handler for mousedown so we can change layers in our edito
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
   // YAHOO.util.Event.addListener(this.el, "mouseup", this.onMouseUp, this, true);
   //YAHOO.util.Event.addListener(this.el, "click", this.onClick, this, true);
   this.setContent(this.options.fields.content);
   this.element = this.el;
};


YAHOO.lang.extend(MySystemNote, WireIt.Container, {
  onMouseUp: function(source) {
    
  },
  onClick: function(source) {

  },
  onDblClick: function(source) {
    MySystemContainer.openPropEditorFor.fire(this);  
  },
  setTitle: function() {
    //ignored
  },
  setContent: function(newContent) {
    if(newContent) {
      var wordWrapChars = 30;
      this.options.fields.content = newContent.wordWrap(wordWrapChars, "\n");
      this.getContentEl().html(this.options.fields.content);
    }
  },
  createContent: function() {
    return $('<div></div>').addClass('content');
  },
  
  getContentEl: function() {
    var content_el = $(this.el).find('.content') 
    if(! (content_el && content_el.size() > 0)) {
      content_el = this.createContent();
      $(this.el).append(content_el);
    }
    this.options.terminals = [];
    this.terminals = [];
    return content_el;
  },
  render: function() {
    // called at least once when the component is first dragged 
    // onto to the drawing area.
    MySystemNote.superclass.render.call(this);
    if (this.options.fields) {
      this.getContentEl().html(this.options.fields.content);
    }
  },
  
  updateFields: function(options) {
    if (this.options.fields){
      if (options) {
        this.setContent(options.content);
      }
      else {
        this.setContent(this.options.fields.content);
      }
    }
  },
  
  getConfig: function() {
    this.options.name = this.title;
    this.options.position[0] = $(this.el).css('left');
    this.options.position[1] = $(this.el).css('top');
    // use prototype merge to resolve options.
    // TODO: this wont work without prototype:
    // var super_options = MySystemNote.superclass.getConfig.call();
    // return $H(super_options).merge($H(this.options));
    return this.options;
  }
});

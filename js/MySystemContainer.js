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
   this.title = options.name || "MySystem Container";
   this.options.fields = options.fields || {'name': this.title, 'energy': 10};
   this.icon = options.icon;
   this.has_sub = options.has_sub || false;
   this.subSystem =  null;
   if (options.subsystem_options != null) {
     this.subSystem = new WireIt.Layer(options.subsystem_options);
     this.subSystem.setWiring(options.subsystem_wiring);
     // tell the editor about the new layer.
     MySystemContainer.openContextFor.fire(this);
   }
   this.options.xtype = "MySystemContainer";
   this.propEditor = null;


   if (this.options.position) {
     $(this.el).setStyle({
       position: 'absolute',
       left: this.options.position[0],
       top: this.options.position[1]
     });
     
    }
   // Adds a handler for mousedown so we can change layers in our editor
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
   YAHOO.util.Event.addListener(this.el, "mouseup", this.onMouseUp, this, true);
   this.setTitle(this.options.fields.name);
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
  
  setTitle: function(newTitle) {
    if(newTitle) {
      var this_el = this.el
      var title_el = $(this_el).down('.title')
      this.title = newTitle;
      this.options.name = this.title;
      this.options.fields.name = this.title;
      if(!title_el) {
        title_el = this.createTitle()
        this_el.insert(title_el);
      }
      title_el.update(this.title);
    }
  },
  createTitle: function() {
    return new Element('div', { 
      'class': 'title' 
    });
  },
  render: function() {
    MySystemContainer.superclass.render.call(this);
    var this_el = this.el
    var title_el = $(this_el).down('.title') 
    if(!title_el) {
      title_el = this.createTitle()
      this_el.insert(title_el);
      title_el.update(this.title);
    }
    
  },
  updateFields: function() {
    debug(($H(this.options.fields).inspect()));
    this.setTitle(this.options.fields.name || this.options.name );
  },
  
  getConfig: function() {
    var super_options = MySystemContainer.superclass.getConfig.call();
    this.options.name = this.title;
    this.options.has_sub = this.has_sub;
    if (this.subSystem != null) {
      this.options.subsystem_options = this.subSystem.options;
      this.options.subsystem_wiring = this.subSystem.getWiring();
    }
    this.options.position[0] = this.el.getStyle('left');
    this.options.position[1] = this.el.getStyle('top');
    // use prototype merge to respolve options.
    return $H(super_options).merge($H(this.options));
  }
});

// register some events for others to subscribe to:
MySystemContainer.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenEditorFor");
MySystemContainer.openContextFor = new YAHOO.util.CustomEvent("openContextFor");









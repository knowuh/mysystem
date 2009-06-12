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
      if(!title_el) {
        title_el = this.createTitle()
        this_el.insert(title_el);
      }
      title_el.update(this.title);
    }
  },
  createTitle: function() {
    return new Element('div', { 
      class: 'title' 
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
  
  getConfig: function() {
	  var super_options = MySystemContainer.superclass.getConfig.call();
	  this.options.name = this.title;
	  this.options.fields = this.fields;
	  this.options.has_sub = this.has_sub;
	  if (this.subSystem != null) {
		  // console.log("saving subsystem config");
		  this.options.subsystem_options = this.subSystem.options;
		  this.options.subsystem_wiring = this.subSystem.getWiring();
	  }
	  return this.options;
  }
});

// register some events for others to subscribe to:
MySystemContainer.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenEditorFor");
MySystemContainer.openContextFor = new YAHOO.util.CustomEvent("openContextFor");









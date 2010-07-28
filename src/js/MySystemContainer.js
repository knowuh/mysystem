/*global MySystemContainer, WireIt, YAHOO */

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
   if (options.subsystem_options) {
     this.subSystem = new WireIt.Layer(options.subsystem_options);
     this.subSystem.setWiring(options.subsystem_wiring);
     // tell the editor about the new layer.
     MySystemContainer.openContextFor.fire(this);
   }
   this.options.xtype = "MySystemContainer";
   this.propEditor = null;


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
   this.setTitle(this.options.fields.name);
   this.element = this.el;
};


YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  onMouseUp: function(source) {
  
  },
  onClick: function(source) {
    
  },
  onDblClick: function(source) {
    MySystemContainer.openPropEditorFor.fire(this);
  },
  
  setTitle: function(newTitle) {
    if(newTitle) {
      var this_el = this.el;
      var title_el = $(this_el).children('.title').first();
      // TODO: No absolutize in jQuery
      // title_el.absolutize();
      var wordWrapChars = 30;
      this.title = newTitle.wordWrap(wordWrapChars, "\n");
      this.options.name = this.title;
      this.options.fields.name = this.title;
      if ((!title_el) || title_el.size() < 1) {
        title_el = this.createTitle();
        $(this_el).prepend(title_el);
      }
      title_el.html(this.title);
      var leftOffset = 0;
      if (title_el.width() > title_el.parent().width()) {
        leftOffset = (title_el.width() - title_el.parent().width())/2;
      }
      title_el.css({
        'left': -1 * leftOffset, 
        'bottom': -1 * title_el.parent().height() 
      });
    }
  },
  
  setBadges: function() {
    var badgeNames = ['energy_make', 'energy_transform', 'energy_store'];
    var badgeHeight = 16,
        badgeWidth = 16;
    var i = 0,
        ii = 0;
    var badgeDomNode = null;
    
    for (i = 0, ii = badgeNames.length; i < ii; i++) {
      badgeDomNode = this.findOrCreateBadge(badgeNames[i], this.el);
      badgeDomNode.attr({
        src: ('images/icons/' + badgeNames[i] + '.png')
        //src: ('images/icons/shield.png')
      });

      badgeDomNode.show().css({
        'opacity': 0.25,
        'top': (20 * i)
      });
      if (this.options.fields && this.options.fields[badgeNames[i]]) {
        badgeDomNode.show().css({
          'opacity': 1
        });
      }
    }
  },
  
  findOrCreateBadge: function(name,domNode) {
    var className = "energy_badge";
    var returnBadge = $(domNode).children('.' + name);
    var thisNode = this;
    if (returnBadge[0]) {
      return $(returnBadge[0]);
    }
    returnBadge = $('<img width="16" hieght="16"></img>').addClass(className).addClass(name);
    $(domNode).append(returnBadge);
    $(returnBadge).click( function(e) {
      thisNode.options.fields[name] = (thisNode.options.fields[name] === true ? false : true);
      thisNode.setBadges();
    }); 
    $(returnBadge).dblclick( function(e) {e.stopPropagation(); return true;});
    
    return returnBadge;
  },
  
  createTitle: function() {
    return $('<div></div>').addClass('title');
  },
  
  render: function() {
    MySystemContainer.superclass.render.call(this);
    var this_el = this.el;
    var title_el = $(this_el).children('.title').first();
    if(!title_el) {
      title_el = this.createTitle();
      $(this_el).prepend(title_el);
      title_el.html(this.title);
    }
    this.setBadges();
  },
  
  updateFields: function(options) {
    if (options) {
      for (var name in options) {
        if (this.options.fields[name] || this.options.fields[name] === false) {
          this.options.fields[name] = options[name];
        }
      }
      if (this.options.fields.color) {
        this.options.fields.color = options.selected_color;
      }
      this.setTitle(options.name);
    }
    else {
      this.setTitle(this.options.fields.name || this.options.name );
    }
    this.setBadges();
  },
  
  getConfig: function() {
    var super_options = MySystemContainer.superclass.getConfig.call();
    this.options.name = this.title;
    this.options.has_sub = this.has_sub;
    if (this.subSystem !== null) {
      this.options.subsystem_options = this.subSystem.options;
      this.options.subsystem_wiring = this.subSystem.getWiring();
    }
    this.options.position[0] = $(this.el).css('left');
    this.options.position[1] = $(this.el).css('top');
    // use prototype merge to respolve options.
    
    var options = {};
    var key = null;
    for (key in super_options) {
        options[key] = super_options.get(key);
    }
    for (key in this.options) {
        options[key] = this.options[key];
    }
    return options;
  }
});

// register some events for others to subscribe to:
MySystemContainer.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenEditorFor");
MySystemContainer.openContextFor = new YAHOO.util.CustomEvent("openContextFor");









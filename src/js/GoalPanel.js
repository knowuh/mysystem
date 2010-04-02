(function() {
  
  GoalPanel = function(elem, icon) {
    var self = this;
    
    this.elem = elem;
    this.icon = icon;
    this.panel = new YAHOO.widget.Panel(this.elem.attr('id'), {
      xy: [580, -10],
      width: '300px',
      close: false
    });
    this.panel.buildWrapper();
    
    this.icon.click(function(event) {
      if (self.collapsed) {
        self.expand();
      }
      else {
        self.collapse();
      }
      event.preventDefault();
    });
    
    this.expand();
  };
  
  GoalPanel.prototype = {
    render : function() {
      this.panel.render();
    },
    
    collapse: function() {
      this.elem.css({ height: '32px' })
      this.icon.attr({'src': 'images/down-arrow.png'});
      this.collapsed = true;
    },
    
    expand: function() {
      this.elem.css({ height: 'auto' });
      this.icon.attr({'src': 'images/up-arrow.png'});
      this.collapsed = false;
    }
  };
  
})();

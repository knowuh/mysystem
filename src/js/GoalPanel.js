(function() {
  
  GoalPanel = function(elemId, iconId) {
    var self = this;
    
    this.elemId = elemId;
    this.iconId = iconId;
    this.panel = new YAHOO.widget.Panel(this.elemId, {
      xy: [580, -10],
      width: '300px',
      close: false
    });
    this.panel.buildWrapper();
    
    $(iconId).observe('click', function(event) {
      if (self.collapsed) {
        self.expand();
      }
      else {
        self.collapse();
      }
      event.stop();
    });
    
    this.expand();
  };
  
  GoalPanel.prototype = {
    render : function() {
      this.panel.render();
    },
    
    collapse: function() {
      $(this.elemId).setStyle({ height: '32px' });
      $(this.iconId).writeAttribute('src', 'images/down-arrow.png');
      this.collapsed = true;
    },
    
    expand: function() {
      $(this.elemId).setStyle({ height: 'auto' });
      $(this.iconId).writeAttribute('src', 'images/up-arrow.png');
      this.collapsed = false;
    }
  };
  
})();

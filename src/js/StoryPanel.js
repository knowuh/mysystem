(function($) {
   
  $.fn.editable = function(settings) {
    var config = {
      editCallback:  null 
    };
    if (settings) $.extend(config, settings);
    this.each(function() {
      $(this).dblclick(function() {
        var text = $(this).text().trim();
        var text_length = text.length
        var old_stuff = $(this);
        var new_stuff = $('<textarea name="tmp">' + text + '</textarea>');
        $(new_stuff).insertAfter(old_stuff).trigger("focus");
        $(old_stuff).addClass("hidden");
        $(new_stuff).focusout(function() {
          var value = $(new_stuff).val().trim();
          $(new_stuff).remove();
          $(old_stuff).text(value);
          $(old_stuff).removeClass("hidden");
          if (config.editCallback) {
            config.editCallback(value);
          };
        });
        });
      });
     return this;
  };
  
  $.fn.selectable = function(settings) {
    var config = {
      selected_class: "story_selected",
      selectCallback: null
    };
    if (settings) $.extend(config,settings);
    config.selector = '.' + config.selected_class;
    this.each(function() {
      $(this).click(function() {        
        $(config.selector).removeClass(config.selected_class);
        $(this).addClass(config.selected_class);
        if (config.selectCallback) {
          config.selectCallback($(this));
        };
      });
    });
    return this;
  };
  
  $.fn.deleteable = function(settings) {
    var config = {
      button: ".story_action", 
      target: "li",
      deleteCallback: null
    };
    if (settings) $.extend(config,settings);
    this.each(function() {
      $(this).hover(function () {
          $(this).find(config.button).addClass("story_delete");
          $(this).find(".story_delete").click(function() {
            if(config.deleteCallback) {
              config.deleteCallback($(this));
            }
            $(this).closest(config.target).remove();
          });
        },function () {
          $(this).find(config.button).removeClass("story_delete").unbind("click");
      });
    
    });
    return this;
  };
  
  $.fn.hoverClass = function(settings) {
    var config = {h_class: "story_hover"};
    if (settings) $.extend(config,settings);
    this.each(function() {
        $(this).hover(function() {
          $(this).addClass(config.h_class);
          $(this).removeClass(config.h_class);
        });
    }); 
  };
  
  $.fn.editableItem = function(settings) {
    var config = {
      storySelector:    ".story_part",
      dstSelector:      "#story",
      text:             "(enter more of your story here)",
    };
    if (settings) $.extend(config,settings);
    this.each(function() {
      var toAdd = $(this).clone();
      var toAppendTo = $(config.dstSelector);
      toAdd.appendTo(toAppendTo);
      var story_part = $(toAdd).find(config.storySelector);
      $(story_part).text(config.text);
      
      $(toAdd).deleteable(config);
      $(story_part).hoverClass(config);
      $(story_part).editable(config);
      $(story_part).selectable(config);
    });
    return this;
  };

  $.fn.editableList = function(settings) {
    var config = {
      storySelector:    ".story_part",
      domID:            "story",
      dstSelector:      "#story_content",
      text:             "(enter more of your story here)"
    };
    if (settings) $.extend(config,settings);
    var domFragment =  $('<div class="' + config.container + '"></div>');
    var toAdd = $(this).clone();
    toAdd.find(".story").attr("id", config.domID.replace("#",""));
    var toAppendTo = $(config.dstSelector);
    toAdd.appendTo(toAppendTo);
    
    if (config.addHandler) {
      $(config.domID).find('.story_add').click(function() {  
        config.addHandler();
      }); 
    };
    return this;  
  }
  
  /************ Story.StoryPanel namespace ************/ 
  if (typeof Story == "undefined") Story = {};
  
  
  Story.StoryPanel = function(opts) { 
    this.init(opts);
    Story.StoryPanel.list.push(this);
  };

  Story.StoryPanel.list = [];

  Story.StoryPanel.count = function() {
    return Story.StoryPanel.list.length;
  }
  
  Story.StoryPanel.constructor = Story.StoryPanel;

  Story.StoryPanel.prototype.init = function(opts) {
    var self = this;
    this.config = {
      domPrefix: '#story',
      addHandler: function() { self.addStory(); }
    };
    if (opts) $.extend(this.config,opts);
    this.data = {};
    this.data.storyParts = [];
    this.domID = this.config.domPrefix + Story.StoryPanel.count();
    this.config.domID = this.domID;
    $(document).ready(function() {
      self.initGUI();
    });
  };


  Story.StoryPanel.prototype.initGUI = function() {
    var self = this;
    $("#templates>.story_container").editableList(self.config);
    self.addStory({text: "first ..."});
    self.addStory({text: "then ..."});
    self.addStory({text: "and finally ..."});
    $(self.domID).prev().dblclick(function() {
        $('#data>.code').text(self.json());  
    });
    $('.story_container').draggable({handle: ".drag_handle"});
  };

  Story.StoryPanel.prototype.addStory = function(_opts) {
    var config = {
      text: "new story part",
      dstSelector: this.domID + ">.story_parts"
    }
    $.extend(config,_opts);
    var self = this;
    var story_part = new Story.StoryPart(config);

    // callbacks to update models:
    config.deleteCallback =   function()     { self.data.storyParts.removeObject(story_part); };
    config.editCallback  =    function(text) { story_part.setText(text)};
    config.selectCallback =   function()     { story_part.select(); };
    config.deselectCallback = function()     { story_part.deselect(); };

    this.data.storyParts.addUnique(story_part);
    // udpate the GUI
    $('#templates>.story_row').editableItem(config);
  };
  
  Story.StoryPanel.prototype.json = function() {
    var parts = this.data.storyParts;
    var part = null;
    var jsonData = {
      stories: [] 
    };
    for (var i = 0; i < parts.length; i++) {
      part = parts[i];
      jsonData.stories.push(part.data);
    };
    return JSON.stringify(jsonData,null,2);
  };
})(jQuery);


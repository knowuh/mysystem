        (function($) {
           
          $.fn.editable = function(settings) {
             var config = {'foo': 'bar'};
             if (settings) $.extend(config, settings);
             this.each(function() {
               $(this).dblclick(function() {
                  var text = $(this).text().trim();
                  var text_length = text.length
                  var old_stuff = $(this);
                  var new_stuff = $('<textarea name="tmp">' + text + '</textarea>');
                  $(new_stuff).insertAfter(old_stuff).trigger("focus");
                  $(old_stuff).addClass("hidden");
                  $(new_stuff).mouseout(function() {
                      var value = $(new_stuff).val();
                      $(new_stuff).remove();
                      $(old_stuff).text(value);
                      $(old_stuff).removeClass("hidden");
                  });
                });
             });
             return this;
          };
          
          $.fn.selectable = function(settings) {
            var config = {selected_class: "selected"};
            if (settings) $.extend(config,settings);
            config.selector = '.' + config.selected_class;
            this.each(function() {
              $(this).click(function() {
                $(config.selector).removeClass(config.selected_class);
                $(this).addClass(config.selected_class);
              });
            });
            return this;
          };
          
          $.fn.deleteable = function(settings) {
            var config = {button: ".action", target: "li"};
            if (settings) $.extend(config,settings);
            this.each(function() {
              $(this).hover(function () {
                  $(this).find(config.button).addClass("delete");
                  $(this).find(".delete").click(function() {
                    $(this).closest(config.target).remove();
                  });
                },function () {
                  $(this).find(config.button).removeClass("delete").unbind("click");
              });
            
            });
            return this;
          };
          
          $.fn.hover_class = function(settings) {
            var config = {h_class: "hover"};
            if (settings) $.extend(config,settings);
            this.each(function() {
                $(this).hover(function() {
                  $(this).addClass(config.h_class);
                  }, function() {
                  $(this).removeClass(config.h_class);
                });
            }); 
          };
          
          $.fn.make_story_item = function(settings) {
            var config = {
              storySelector:    ".story_part",
              dstSelector:      "#energy_list",
              text:             "(enter more of your story here)"
            };
            if (settings) $.extend(config,settings);
            this.each(function() {
              var toAdd = $(this).clone();
              var toAppendTo = $(config.dstSelector);
              toAdd.appendTo(toAppendTo);
              var story_part = $(toAdd).find(config.storySelector);
              $(story_part).text(config.text);
              
              $(toAdd).deleteable();
              $(story_part).hover_class();
              $(story_part).editable();
              $(story_part).selectable();
            });
            return this;
          };

          $.fn.init_energy_stories = function() {
            $('#storehouse>.story_row').make_story_item({text: "first ..."});
            $('#storehouse>.story_row').make_story_item({text: "then ..."});
            $('#storehouse>.story_row').make_story_item({text: "and finally ..."});
            $(".add").click(function() {  
              $('#storehouse>.story_row').make_story_item();
            }); 
          };

      })(jQuery);

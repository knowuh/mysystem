/*global MySystemPropEditor YAHOO*/

/**
 * MySystemPropEditor
 * @class MySystemPropEditor
 * @constructor
 * @param {Object} options
 */
MySystemPropEditor = function(options) {
   this.domID = options.domID || "#property_editor";
   this.dom_entity = $(this.domID);
   this.dom_entity.draggable( { handle: '#prop_bar' } );
   this.formName = options.formName || "#prop_form";
   this.form_entity = $(this.formName);
   
   this.selected_color = "#000000";
   this.formTable = $('#form_table');
   
   var hexColors = { 
     '#490A3D' : '', 
     '#BD1550' : '', 
     '#E97F02' : '', 
     '#F8CA00' : '', 
     '#8A9B0F' : ''
    };
   this.setArrows(hexColors);
  
   var self =  this;
   this.dom_entity.keydown(function(e) {
     var code = e.which;
     var escapeKey = 27;
     var returnKey = 13;

     // disable default enter key
     // for submitting form, unless we are in
     // textarea
     if (code == returnKey) {
       if (! e.target == $('#textarea')) {
         e.stop(); // 
       }
     }
     // escape key will close the window:
     if (code == escapeKey) {
       // e.stop();
       self.disable(); 
     }
   });
   
   // the default labelMap
   this.setFieldLabelMap({
     'name': 'label'
   });
   
   this.eventSaveValues = new YAHOO.util.CustomEvent('saveValues', this);
};


MySystemPropEditor.prototype = {
  setFieldLabelMap: function(_map) {
    this.fieldLabelMap = _map;
  },
  
  
  // Create the dom elements
  // to display the form fields
  //
  updateFields: function() {
    this.clearFields();
    var self =  this;
    var key;
    var value;
    for(key in this.node.options.fields) {
      value = this.node.options.fields[key];
      if(key !='color') { 
        this.showField(key,value); 
      }
    }
    
    this.setEditorName(this.node);
    
    $('#property_editor_closer').mouseover( function(e) {
      $('#property_editor_closer').fadeTo('fast',0.99);
    });
    $('#property_editor_closer').mouseout(function(e) {
      $('#property_editor_closer').fadeTo('fast',0.5);
    });
    $('#property_editor_closer').click(function(e) {
      self.disable();
    });
  },
  
  setEditorName: function(node) {
    var xtype = node.xtype || node.options.xtype || 'default';
    var domName = '#prop_name';
    var nodeTypeMap = {
      'default'           : 'Poperties',
      'MySystemNote'      : 'Note Info',
      'MySystemContainer' : 'Information',
      'WireIt-Wire'       : 'Energy Flow Information'
    };
    var domThing = $(domName);
    if (domThing) {
      domThing.text(nodeTypeMap[xtype]);
    }
  },
  
  
  
  showField: function(field_name,value) {
    
    if(this.fieldLabelMap[field_name]) {
      
      var domLabel = $('<label></label>');
      domLabel.attr({'for': field_name});
      domLabel.html(this.fieldLabelMap[field_name].label);
      
      var type = this.fieldLabelMap[field_name].type || 'text';
      var style = this.fieldLabelMap[field_name].style;
      var input;
      if (type =='textarea') {
        // input = new Element('textarea', { 'name': field_name, 'id': field_name});
        input = $('<textarea></textarea>');
        input.attr({ 'name': field_name, 'id': field_name});
        input.html(value);
      }

      else {
        input = $('<input></input>');
        input.attr({ 'type': type, 'name': field_name, 'id': field_name, 'value': value});
        if (type === 'checkbox' && value === true) {
          input.attr({'checked': true});
        }
      }
      if (style) {
        input.attr({'class': style});
      }
      var label_td = $('<td></td>');
      label_td.addClass('input_label');
      label_td.css({'align': 'left','text-align': 'left'});
      label_td.append(domLabel);

      // var input_td = new Element('td', { 'class': 'input_field' });
      var input_td = $('<td></td>');
      input_td.addClass('input_field');
      input_td.append(input);

      var table_row = $('<tr></tr>');
      table_row.addClass('input_row');
      table_row.append(label_td);
      table_row.append(input_td);
      
      var self = this;  
      input.focusout(function() {
        if (self.node) {
          var options = {};
          options[field_name] = (input.val() || '(type-here)');
          self.node.updateFields(options);
        }
      });
      this.formTable.append(table_row);
    }
  },
  
  
  setArrows: function(arrows) {
    var pallet = $('#palette');
    pallet.html('<h4>Flow Type</h4>');
    var arrow = null;
    var counter=0;
    for (arrow in arrows) {
      counter++;
      var id = "color_"+counter;
      
      var color_div = $('<div></div>');
      color_div.attr({'class': 'pallet_element', 'id': id});
      color_div.css({backgroundColor: arrow});
      
      if(arrows[arrow]) {
        color_div.css({'width' : 'auto', 'color' : 'white'});
        color_div.append(arrows[arrow]);
      }
      pallet.append(color_div);
    }
  },

  
  clearFields: function() {
    if (this.formTable) {
      this.formTable.remove();
    }
    this.formTable = $('<table></table>').attr({'id': 'form_table'});
    this.form_entity.html(this.formTable);
  },
  
  
  //
  // save the form field values
  // back into our node.
  //
  saveValues: function() {
    if (this.node) {
      var options = {};
      var value = null;
      for (var name in this.fieldLabelMap) {
        if (this.fieldLabelMap[name]['type'] == 'checkbox') {
          value = $('#' + name).is(':checked') ? true : false;
        }
        else {
          value = $('#' + name).val() || "(type-here)";
        }
        options[name] = value;
      }
      options['selected_color'] = this.selected_color;
      this.node.updateFields(options);
    }
    this.eventSaveValues.fire(this);
  },
  
  
  deselect: function() {
    $('.selected').removeClass('selected');
  },
  
  disable: function() {
    this.saveValues();
    this.dom_entity.hide();
    this.deselect();
    this.setNode(null);
    this.deselect();
    // $(document).die('mousedown');
    if (this.form_observer) {
      this.form_observer.stop();
      this.form_observer = null;
      $('#palette').die('click');
    }
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  },
  
  enableClickAway: function() {
    var self=this;
    var clickHandler = function(e) {
      var close = true;
      var clicked = $(e.target);
      if (self.node) {
        if (clicked == self.node_element) {
          close = false;
        }
      }
      if (self.dom_entity.children(clicked).size() > 1) {
          close = false;
      }
      if (close) {
       self.disable();
      }
    };
    $(document).click(clickHandler);
  },
  

  show: function (nnode) {
    
    this.setNode(nnode);
    this.updateFields();

    this.selected_color = this.node.options.fields.color || "color2";
    var selected_palette_item = $('#'+this.selected_color);
    if (selected_palette_item && selected_palette_item.length > 0) {
      this.deselect();
      $(selected_palette_item).addClass('selected');
    }
    
    this.positionEditor();
    this.showPalette();
    this.positionIcon();
    this.enableClickAway();
    $("textarea:visible:enabled:first").focus();
    $("input:visible:enabled:first").focus();
    var self = this;
    this.autoSaveTimer = setInterval(function() {self.saveValues();}, 300);
  },
  
  
  setNode: function(n) {
    // deselect the last node:
    if (n && n.options){
      if (this.node) {
        if ($(this.node_element)) {
          $(this.node_element).removeClass('selected');
        }
        if (this.node.options.selected) {
          this.node.options.selected=false;
          this.node.redraw();
        }
      }
      this.node = n;
      this.node_element = $(n.element);
    }
    else {
      this.node = null;
      this.node_element = null;
    }
  },
  
  showPalette: function() {
    if (this.node.options.fields.color) {
        $('#palette').show();
        var self = this;
        $('#palette').click(function (event) {
          self.deselect();
          var element = $(event.target);
          element.addClass('selected');
          self.selected_color = element.css('background-color');
          self.saveValues();
        });
        this.node.options.selected=true;
      }
      else {
        $('#palette').hide();
        $(this.node.bodyEl).addClass('selected');
      }
  },
  
  positionEditor: function() {
    this.dom_entity.show();
    var margin = 4;
    var top = this.node_element.offset().top + this.node_element.height() - this.dom_entity.height();
    var left = this.node_element.offset().left - (this.dom_entity.width() + margin);
    left = left < 1 ? 1 : left;
    top = top < 1 ? 1 : top;
    this.dom_entity.offset({
      left: left,
      top: top
    });
  },
  
  nodeIsIcon: function(n) {
    return (n.options && n.options.icon);
  },
  
  positionIcon: function() {
    if (this.nodeIsIcon(this.node)) {
      if($('#icon_spot')) {
        $('#icon_spot').html('<img src="' + this.node.options.icon + '" alt="icon" class="icon"/></br>');
      }
    }
    else {
      if($('#icon_spot')) {
        $('#icon_spot').html('');
      }
    }
  }
  
};

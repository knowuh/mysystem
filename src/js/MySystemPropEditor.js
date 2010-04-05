
/**
 * MySystemPropEditor
 * @class MySystemPropEditor
 * @constructor
 * @param {Object} options
 */
MySystemPropEditor = function(options) {
   this.domID = options.domID || "#property_editor";
   this.dom_entity = $(this.domID);
   this.formName = options.formName || "#prop_form";
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
   this.dom_entity.keydown(function(e){
     var code;
     var escapeKey = 27;
     var returnKey = 13;
     if (e.keyCode) code = e.keyCode;
     else if (e.which) code = e.which;
     
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
      
      var domLabel = $('<label></label>')
        .attr({'for': field_name})
        .html(this.fieldLabelMap[field_name].label);
      var type = this.fieldLabelMap[field_name].type || 'text';      
      var style = this.fieldLabelMap[field_name].style;
      var input;
      if (type =='textarea') {
        // input = new Element('textarea', { 'name': field_name, 'id': field_name});
        input = $('<textarea></textarea>')
          .attr({ 'name': field_name, 'id': field_name})
          .html(value);
      }
      else {
        input = $('<input></input>')
          .attr({ 'type': type, 'name': field_name, 'id': field_name, 'value': value});
      }
      if (style) {
        input.attr({'class': style});
      }
      var label_td = $('<td></td>')
        .addClass('input_label')
        .css({'align': 'right','text-align': 'right'})
        .append(domLabel);

      // var input_td = new Element('td', { 'class': 'input_field' });
      var input_td = $('<td></td>')
        .addClass('input_field')
        .append(input);

      var table_row = $('<tr></tr>')
        .addClass('input_row')
        .append(label_td)
        .append(input_td);
      var self = this;  
      input.focusout(function() {
        if (self.node) {
          self.node.options.fields[field_name] = input.val() || "(type-here)";
          self.node.updateFields();
        }
      });
      this.formTable.append(table_row);
    }
  },
  
  
  setArrows: function(arrows) {
    var pallet = $('#palette');
    pallet.html('<h4>Flow Type</h4>');
    var arrow = null;
    for (arrow in arrows) {
      var color_div = $('<div></div>')
        .attr({'class': 'pallet_element'})
        .css({backgroundColor: arrow});
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
    $(this.formName).html(this.formTable);
  },
  
  
  //
  // save the form field values
  // back into our node.
  //
  saveValues: function() {    
    var theForm = $(this.formName);
    for (var name in this.fieldLabelMap) {
      if (this.node) {
        if (this.node.options.fields[name]) {
          // If no value exists, return the (type-here) value
          this.node.options.fields[name] = $('#' + name).val() || "(type-here)"; 
        }
        if (this.node.options.fields.color) {
          this.node.options.fields.color = this.selected_color;
        }
        this.node.updateFields();
      }
    }

  
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
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('#palette').die('click');
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
  

  show: function(nnode) {        
    
    this.setNode(nnode);
    this.updateFields();

    this.selected_color = this.node.options.fields.color || "color2";
    var selected_palette_item = $('#'+this.selected_color);
    if (selected_palette_item && selected_palette_item.length > 0) {
      this.deselect();
      $(selected_palette_item).attr({'class':'selected'});
    }
    
    this.positionEditor();
    this.showPalette();
    this.positionIcon();
    this.enableClickAway();
    var self = this;
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
          self.selected_color = element.attr('id');
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

    this.dom_entity.position({
      offsetLeft: this.node_element.width()
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
  
}

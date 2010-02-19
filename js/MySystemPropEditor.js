
/**
 * MySystemPropEditor
 * @class MySystemPropEditor
 * @constructor
 * @param {Object} options
 */
MySystemPropEditor = function(options) {
   this.domID = options.domID || "prop_form";
   this.dom_entity = $(this.domID);
   this.formName = options.formName || "prop_form_form";
   this.selected_color = "#000000";
   this.formTable = $('form_table');
   
   var hexColors = [ '#490A3D', '#BD1550', '#E97F02', '#F8CA00', '#8A9B0F'];
   this.setColorPallet(hexColors);
  
   var self =  this;
   this.dom_entity.observe('keydown', function(e){
     var code;
     var escapeKey = 27;
     var returnKey = 13;
     if (e.keyCode) code = e.keyCode;
     else if (e.which) code = e.which;
     
     // disable default enter key
     // for submitting form, unless we are in
     // textarea
     if (code == returnKey) {
       if (! e.element().match('textarea')) {
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
    

    // this.formTable = new Element('table', {'id': 'prop_form_table'});

    $H(this.node.options.fields).each(function (pair) {
      var field_name = pair.key;
      var _value = this.node.options.fields[field_name];
      if(field_name !='color') {
        this.showField(field_name,_value);
      }
    }.bind(this));
    

    this.setEditorName(this.node);
    
    $('prop_form_closer').observe('mouseover',function(e) {
      self.opacity(0.99,'prop_form_closer');
    });
    $('prop_form_closer').observe('mouseout',function(e) {
      self.opacity(0.5,'prop_form_closer');
    });
    $('prop_form_closer').observe('click',function(e) {
      self.disable();
    });
  },
  
  setEditorName: function(node) {
    var xtype = node.xtype || node.options.xtype || 'default';
    var domName = 'prop_name';
    var nodeTypeMap = {
      'default'           : 'Poperties',
      'MySystemNote'      : 'Note Info',
      'MySystemContainer' : 'Information',
      'WireIt-Wire'       : 'Energy Flow Information'
    };
    var domThing = $(domName);
    if (domThing) {
      domThing.update(nodeTypeMap[xtype]);
    }
  },
  
  showField: function(field_name,value) {
    
    if(this.fieldLabelMap[field_name]) {

      var fields = $('prop_fields');
      var label = new Element('label', {'for': field_name});
      label.update(this.fieldLabelMap[field_name].label);
      var type = this.fieldLabelMap[field_name].type || 'text';      
      var style = this.fieldLabelMap[field_name].style
      var input;
      if (type =='textarea') {
        input = new Element('textarea', { 'name': field_name, 'id': field_name});
        input.insert({'bottom': value});
      }
      else {
        input = new Element('input', { 'type': type, 'name': field_name, 'id': field_name, 'value': value});
      }
      if (style) {
        input.addClassName(style);
      }
      var label_td = new Element('td', {'align': 'right', 'class': 'input_label' });
      label_td.setStyle({'align': 'right'});
      label_td.setStyle({'text-align': 'right'});
      label_td.insert({'bottom': label});

      var input_td = new Element('td', { 'class': 'input_field' });
      input_td.insert({'bottom': input});

      var table_row = new Element('tr', { 'class': 'input_row'});
      table_row.insert({'bottom': label_td});
      table_row.insert({'bottom': input_td});
      this.formTable.insert({'bottom': table_row});
    }
  },
  
  
  setColorPallet: function(hexColors) {
    var pallet = $('palette');
    hexColors.each(function (c) {
      var color_div = new Element('div', {'class': 'pallet_element' });
      color_div.setStyle({backgroundColor: c});
      pallet.insert({'bottom': color_div});
    });
  },
  
  opacity: function(opacity, dom_id) {
    var elem = $(dom_id);
    elem.setStyle({
      'opacity': opacity,
      '-moz-opacity': opacity,
      'filter': 'alpha(opacity=' + (opacity * 100) +')'
    });

  },
  
  clearFields: function() {
    if (this.formTable && this.formTable.up()) {
      this.formTable.remove();
    }
    this.formTable = new Element('table', {'id': 'form_table'});
    $(this.formName).insert({'bottom': this.formTable});
  },
  
  
  //
  // save the form field values
  // back into our node.
  //
  saveValues: function() {
    var theForm = $(this.formName);
    for (var name in this.fieldLabelMap) {
      try {
        if (this.node.options.fields[name]) {
          this.node.options.fields[name] = theForm[name].getValue();
        }
      }
      catch(e) {
        debug("unable to save property " + name + " for " + this.node);
      }
    }

    if (this.node.options.fields.color) {
      this.node.options.fields.color = this.selected_color;
    }
    this.node.updateFields();
  },
  
  
  deselect: function() {
    $$('.selected').each( function(elem) {
       elem.removeClassName('selected');
     });
  },
  
  disable: function() {
    this.dom_entity.hide();
    this.deselect();
    this.setNode(null);
    this.deselect();
    document.stopObserving('mousedown');
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('palette').stopObserving('click');
    }
  },
  
  enableClickAway: function() {
    var clickHandler = function(e) {
      var close = true;
      var clicked = e.element();
      if (this.node) {
        if (clicked == this.node_element || clicked.descendantOf(this.node_element)) {
          close = false;
        }
      }
      if ( clicked == this.dom_entity 
        || clicked.descendantOf(this.dom_entity)) {
          close = false;
      }
      if (close) {
       this.disable();
      }
    };
    document.observe('click', clickHandler.bind(this));
  },
  

  show: function(nnode) {        
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('palette').stopObserving('click');
    }
    this.setNode(nnode);
    this.updateFields();

    this.selected_color = this.node.options.fields.color || "color2";
    var selected_pallete_item = $(this.selected_color);
    if (selected_pallete_item) {
      this.deselect();
      $(selected_pallete_item).addClassName('selected');
    }

    
    this.positionEditor();
    this.showPallet();
    this.positionIcon();
    this.enableClickAway();
    this.form_observer = new Form.Observer($(this.formName),0.3,this.saveValues.bind(this));
    $(this.formName).focusFirstElement();
  },
  
  
  setNode: function(n) {
    // deselect the last node:
    if (n && n.options){
      if (this.node) {
        if ($(this.node_element)) {
          $(this.node_element).removeClassName('selected');
        }
        if (this.node.options.selected) {
          this.node.options.selected=false;
          this.node.redraw();
        }
      }
      this.node = n;
      this.node_element = n.element;
    }
    else {
      this.node = null;
      this.node_element = null;
    }
  },
  
  showPallet: function() {
    if (this.node.options.fields.color) {
        $('palette').show();
        $('palette').observe('click', function (event) {
          this.deselect();
          var element = event.element();
          element.addClassName('selected');
          this.selected_color = element.identify();
          this.saveValues();
        }.bind(this));
        this.node.options.selected=true;
      }
      else {
        $('palette').hide();
        $(this.node.bodyEl).addClassName('selected');
      }
  },
  
  positionEditor: function() {
    this.dom_entity.show();
    this.dom_entity.absolutize();

    this.dom_entity.clonePosition(this.node_element,{
      setWidth: false,
      setHeight: false,
      offsetLeft: this.node_element.getWidth(),
    });
  },
  
  nodeIsIcon: function(n) {
    return (n.options && n.options.icon);
  },
  
  positionIcon: function() {
    if (this.nodeIsIcon(this.node)) {
      if($('icon_spot')) {
        $('icon_spot').update('<img src="' + this.node.options.icon + '" alt="icon" class="icon"/></br>');
      }
    }
    else {
      if($('icon_spot')) {
        $('icon_spot').update('');
      }
    }
  }
  
}














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
   this.selected_color = "#000000"
};


MySystemPropEditor.prototype = {
  
  updateFields: function() {
    this.clearFields();
    var me = this;
    $H(this.node.options.fields).each(function (pair) {
      var field_name = pair.key;
      var _value = me.node.options.fields[field_name];
      if(field_name !='color') {
        // fields.push (fieldTmpl.evaluate({name: field_name, value: this.node.options.fields[field_name]}));
        me.addField(field_name,_value);
      }
    }.bind(me));
  // });
    // fields.push (subsTmpl.evaluate({checked: (this.node.has_sub ? 'checked="true"' : '')}));
    // var fieldText = fields.join("<br/>")
    // $('prop_fields').update(fieldText);
    if (this.node.title) {
      $('prop_name').update("info about " + this.node.title);
    }
    else {
      $('prop_name').update("info for flow");
    }

    //try to activate the name field.
    if ($('name')) {
      $('name').activate();
    }
  },
  
  clearFields: function() {
    $('prop_fields').update('');
  },
  
  addField: function(field_name,value) {
    var type = 'text';
    var fields = $('prop_fields');
    debug(this + ": " + field_name + ": " + value);
    var label = new Element('label', {'for': field_name});
    label.update(field_name);

    var input = new Element('input', { 'type': type, 'name': field_name, 'id': field_name, 'value': value});

    var label_td = new Element('td', { 'class': 'input_label' });
    label_td.insert({'bottom': label});

    var input_td = new Element('td', { 'class': 'input_field' });
    input_td.insert({'bottom': input});

    var table_row = new Element('tr', { 'class': 'input_row'});
    table_row.insert({'bottom': label_td});
    table_row.insert({'bottom': input_td});

    $('prop_fields').insert({'bottom': table_row});
    debug('added: ' + field_name + ": " + value);

  },
  
  save_values: function() {
    var theForm = $(this.formName);
    var fieldNames = $H(this.node.options.fields).keys();
    theForm.getInputs('text').each(function (fe) {
      this.node.options.fields[fe.name] = fe.value;
    }.bind(this));
    debug("set color "+ this.selected_color);
    if (this.node.options.fields.color) {
      this.node.options.fields.color = this.selected_color;
    }
    this.node.has_sub = $F('has_sub')
    this.node.updateFields();
  },
  
  
  deselect: function() {
    $$('.selected').each( function(elem) {
       elem.removeClassName('selected');
     });
  },
  
  
  enableClickAway: function() {
    var prop_editor = this;
    var clickHandler = function(e) {
      var clicked = e.element();
      if ( clicked == prop_editor.dom_entity  
        || clicked == prop_editor.node.bodyEl 
        || clicked.descendantOf(prop_editor.dom_entity) 
        || clicked.descendantOf(prop_editor.node.bodyEl)) {
        // nothing;
      }
      else {
        prop_editor.dom_entity.hide();
        document.stopObserving('mousedown',clickHandler);
      }
    };
    document.observe('mousedown', clickHandler);
  },
  

  
  show: function(node) {        
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('palette').stopObserving('click');
    }
    this.setNode(node);
    this.updateFields();

    this.selected_color = this.node.options.fields.color || "color2";
    var selected_pallete_item = $(this.selected_color);
    if (selected_pallete_item) {
      this.deselect();
      $(selected_pallete_item).addClassName('selected');
    }
  
    this.form_observer = new Form.Observer($(this.formName),0.3,this.save_values.bind(this));
    this.positionEditor();
    this.showPallet();
    this.positionIcon();
    this.enableClickAway();
  },
  
  
  setNode: function(node) {
    // deselect the last node:
    if (this.node) {
      if ($(this.node.bodyEl)) {
        $(this.node.bodyEl).removeClassName('selected');
      }
      if (this.node.options.selected) {
        this.node.options.selected=false;
        this.node.redraw();
      }
    }
    this.node = node;
  },
  
  showPallet: function() {
    if (this.node.options.fields.color) {
        $('palette').show();
        $('palette').observe('click', function (event) {
          this.deselect();
          var element = event.element();
          element.addClassName('selected');
          this.selected_color = element.identify();
          this.save_values();
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
    this.dom_entity.clonePosition(this.node.bodyEl,{
      setWidth: false,
      setHeight: false,
      offsetLeft: this.node.bodyEl.getWidth() / 2,
      offsetTop:  this.node.bodyEl.getHeight() / 2
    });
  },
  
  positionIcon: function() {
    if (this.node.options.icon) {
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













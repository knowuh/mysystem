
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
    var self =  this;
    $H(this.node.options.fields).each(function (pair) {
      var field_name = pair.key;
      var _value = this.node.options.fields[field_name];
      if(field_name !='color') {
        this.addField(field_name,_value);
      }
    }.bind(this));

    if (this.node.title) {
      $('prop_name').update("info about " + this.node.title);
    }
    else {
      $('prop_name').update("info for flow");
    }
    $('prop_form_closer').observe('mouseover',function(e) {
      self.opacity(0.99,'prop_form_closer');
    });
    $('prop_form_closer').observe('mouseout',function(e) {
      self.opacity(0.5,'prop_form_closer');
    });
    $('prop_form_closer').observe('click',function(e) {
      self.disable();
    });
    this.dom_entity.observe('keydown', function(e){
      var code;
      if (e.keyCode) code = e.keyCode;
      else if (e.which) code = e.which;
      if (code == 27) {
        // e.stop();
        self.disable(); 
      }
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
    $('prop_fields').update('');
  },
  
  addField: function(field_name,value) {
    var type = 'text';
    var fields = $('prop_fields');
    var label = new Element('label', {'for': field_name});
    label.update(field_name);

    var input = new Element('input', { 'type': type, 'name': field_name, 'id': field_name, 'value': value});

    var label_td = new Element('td', {'align': 'right', 'class': 'input_label' });
    label_td.setStyle({'align': 'right'});
    label_td.setStyle({'text-align': 'right'});
    label_td.insert({'bottom': label});

    var input_td = new Element('td', { 'class': 'input_field' });
    input_td.insert({'bottom': input});

    var table_row = new Element('tr', { 'class': 'input_row'});
    table_row.insert({'bottom': label_td});
    table_row.insert({'bottom': input_td});

    $('prop_fields').insert({'bottom': table_row});
  },
  
  save_values: function() {
    var theForm = $(this.formName);
    var fieldNames = $H(this.node.options.fields).keys();
    theForm.getInputs('text').each(function (fe) {
      this.node.options.fields[fe.name] = fe.value;
    }.bind(this));
  
    if (this.node.options.fields.color) {
      this.node.options.fields.color = this.selected_color;
    }
    // this.node.has_sub = $F('has_sub')
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
    this.form_observer = new Form.Observer($(this.formName),0.3,this.save_values.bind(this));
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
    this.dom_entity.clonePosition(this.node_element,{
      setWidth: false,
      setHeight: false,
      offsetLeft: this.node_element.getWidth() / 2,
      offsetTop:  this.node_element.getHeight() / 2
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













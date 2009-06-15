
/**
 * MySystem Container. Has an image. and double_click beahvor.
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
MySystemPropEditor = function(options) {
   this.domID = options.domID || "prop_editor";
   this.formName = options.formName || "prop_form_form";
   this.selected_color = "#000000"
};


MySystemPropEditor.prototype = {
  updateFields: function() {
    var subsTmpl = new Template ('<div class="inputBox"><label for="has_sub">sub systems?</label><input type="checkbox" #{checked} name="has_sub" value="1" id="has_sub"></div>')
    var fieldTmpl = new Template('<div class="inputBox"><label for="#{name}">#{name}</label><input type="text" name="#{name}" value="#{value}" id="#{name}"></div>');
    var fields = [];
    $H(this.node.options.fields).keys().each(function (field_name) {
      if(field_name !='color') {
        fields.push (fieldTmpl.evaluate({name: field_name, value: this.node.options.fields[field_name]}));
      }
    }.bind(this));
    fields.push (subsTmpl.evaluate({checked: (this.node.has_sub ? 'checked="true"' : '')}));
    var fieldText = fields.join("<br/>")
    $('prop_name').update("properties for " + this.node.title);
    $('prop_fields').update(fieldText);
  },
  save_values: function() {
    var theForm = $(this.formName);
    var fieldNames = $H(this.node.options.fields).keys();
    theForm.getInputs('text').each(function (fe) {
      this.node.options.fields[fe.name] = fe.value;
    }.bind(this));
    console.log("set color "+ this.selected_color);
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
  
  show: function(node) {
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('palette').stopObserving('click');
    }
    this.node = node;
    this.updateFields();

    this.selected_color = this.node.options.fields.color || "color2";
    var selected_pallete_item = $(this.selected_color);
    if (selected_pallete_item) {
      this.deselect();
      $(selected_pallete_item).addClassName('selected');
    }
  
    this.form_observer = new Form.Observer($(this.formName),0.3,this.save_values.bind(this));
    $('prop_form').show();
    if (this.node.options.fields.color) {
      $('palette').show();
      $('palette').observe('click', function (event) {
        this.deselect();
        var element = event.element();
        element.addClassName('selected');
        this.selected_color = element.identify();
        this.save_values();
      }.bind(this));
    }
    else {
      $('palette').hide();
    }
  }
  
}













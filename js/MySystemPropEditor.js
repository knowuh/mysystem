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
};

MySystemPropEditor.prototype = {
  updateFields: function() {
    var subsTmpl = new Template ('<div class="inputBox"><label for="has_sub">sub systems?</label><input type="checkbox" #{checked} name="has_sub" value="1" id="has_sub"></div>')
    var fieldTmpl = new Template('<div class="inputBox"><label for="#{name}">#{name}</label><input type="text" name="#{name}" value="#{value}" id="#{name}"></div>');
    var fields = [];
    $H(this.node.options.fields).keys().each(function (field_name) {
      fields.push (fieldTmpl.evaluate({name: field_name, value: this.node.options.fields[field_name]}));
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
    this.node.has_sub = $F('has_sub')
    this.node.updateFields();
  },
  show: function(node) {
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
    }
    this.node = node;
    this.updateFields();
    this.form_observer = new Form.Observer($(this.formName),0.3,this.save_values.bind(this));
    $('prop_form').show();
  }
}













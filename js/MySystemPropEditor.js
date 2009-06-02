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
    var subsTmpl = new Template ('<label for="has_sub">sub systems?</label><input type="checkbox" #{checked} name="has_sub" value="1" id="has_sub">')
    var fieldTmpl = new Template('<label for="#{name}">#{name}</label><input type="text" name="#{name}" value="#{value}" id="#{name}">');
    var fields = [];
    fields.push (fieldTmpl.evaluate({name: "name", value: this.node.name}));
    $H(this.node.fields).keys().each(function (name) {
      fields.push (fieldTmpl.evaluate({name: name, value: this.node.fields[name]}));
    }.bind(this));
    fields.push (subsTmpl.evaluate({checked: (this.node.has_sub ? 'checked="true"' : '')}));
    var fieldText = fields.join("<br/>")
    $('prop_name').update("properties for " + this.node.name);
    $('prop_fields').update(fieldText);
  },
  save_values: function() {
    console.log("prop value changed! for " +this.node.name);
    var theForm = $(this.formName);
    this.node.name = $F('name');
    this.node.energy = $F('energy');
    var fieldNames = $H(this.node.fields).keys();
    theForm.getInputs('text',[fieldNames]).each(function (fe) {
      var name = fe.name;
      this.node.fields[name] = fe.value;
    }.bind(this));
    this.node.has_sub = $F('has_sub')
    console.log($F('has_sub'));
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













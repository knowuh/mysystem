/**
 * MySystem Container. Has an image. and double_click beahvor.
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
MySystemPropEditor = function(node, options) {
   this.node = node;
   this.domID = options.domID || "prop_editor";
   this.bodyTmpl = new Template('<form name="form_for_#{name} id="form_for_#{name}>#{fields}<br/><input type="submit" name="save" value="save" id="save_button"></form>')
   this.fieldTmpl = new Template('<label for="#{name}"></label>#{name}<input type="text" name="#{name}" value="#{value}" id="#{name}">');
   this.headTmpl = new Template('prop editor for #{name}');
   this.footTmpl = new Template('end for #{name}')
};

MySystemPropEditor.prototype = {
  setProps: function() {
      console.log("modal thingy closed");
  },
  
  doTemplate: function() {
    this.panel.setHeader(this.headTmpl.evaluate({name: this.node.name}));
    this.panel.setFooter(this.footTmpl.evaluate({name: this.node.name}));
    var nameField = this.fieldTmpl.evaluate({name: "name", value: this.node.name});
    var energyField = this.fieldTmpl.evaluate({name: "energy", value: (this.node.energy || 10)});
    var fields = nameField + "<br/>" + energyField;
    this.panel.setBody  (this.bodyTmpl.evaluate({name: "name", value: this.node.name, fields: fields}));
  },
  
  
  show: function() {
    if (!this.panel) {
      console.log("making a new panel")
      this.panel = new YAHOO.widget.Panel(this.domID, {
        fixedcenter: true,
        draggable: true,
        visible: false,
        close: false,
        modal: true
      });
    }
    this.doTemplate();
    this.panel.hideMaskEvent.subscribe(this.setProps,this,true);
    this.panel.render("props");
    this.panel.show();

    var saveButton = $('save_button');
    console.log(saveButton.inspect());
    saveButton.observe('click', function(e) {
          e.stop();
          console.log("you clicked it!");
          this.node.name = $F('name');
          this.node.energy = $F('energy');
          this.panel.destroy();
          this.panel = null;
          saveButton.stopObserving();
    }.bind(this));
  }
  
}













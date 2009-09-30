/**
 * MySystemPropEditor
 * @class MySystemPropEditor
 * @constructor
 * @param {Object} options
 */
MySystemPropEditor = function(options) {
   this.domID = options.domID || "prop_editor";
   this.formName = options.formName || "prop_form_form";
   this.selected_color = "#000000"
};

MySystemPropEditor.prototype = {
  updateFields: function() {
  
    // The way the forms are built, they work of the base modules and not the 'new copies' of the modules created upon dragging into the canvas
    
    try{
      realEngineNode = this.node.module.engineNode;
    }
    catch(e){
      realEngineNode = null;
    }
  
    var subsTmpl = new Template ('<div class="inputBox"><label for="has_sub">sub systems?</label><input type="checkbox" #{checked} name="has_sub" value="1" id="has_sub"></div>')
    var fieldTmpl = new Template('<div class="inputBox"><label for="#{name}">#{name}</label><input type="text" name="#{name}" value="#{value}" id="#{name}"></div>');
    var fields = [];
    
    console.log(this.node);
    
    $H(this.node.options.fields).keys().each(function (field_name) {
      if(field_name !='color') {
        switch( field_name ){
          case 'inputRate':
            fields.push (fieldTmpl.evaluate({name: field_name, value: realEngineNode.inputRate }));
            break;
          case 'efficiency':
            fields.push (fieldTmpl.evaluate({name: field_name, value: realEngineNode.efficiency }));
            break;
          case 'form':
            fields.push (fieldTmpl.evaluate({name: field_name, value: realEngineNode.form }));
            break;
          case 'name':
          case 'width':          
            fields.push (fieldTmpl.evaluate({name: field_name, value: this.node.options.fields[field_name] }));
            break;
          case 'heatLoss':
            fields.push (fieldTmpl.evaluate({name: field_name, value: realEngineNode.heatLoss }));
            break;
          default:
            fields.push (fieldTmpl.evaluate({name: field_name, value:  this.node.options.fields[field_name].value }));
            break;
      }
      //fields.push (fieldTmpl.evaluate({name: field_name, value: this.node.options.fields[field_name]}));
      }
    }.bind(this));
    fields.push (subsTmpl.evaluate({checked: (this.node.has_sub ? 'checked="true"' : '')}));
    var fieldText = fields.join("<br/>")
    if (this.node.title) {
      $('prop_name').update("properties for " + this.node.title);
    }
    else {
      $('prop_name').update("properties for wire");
    }
    $('prop_fields').update(fieldText);
    //try to activate the name field.
    if ($('name')) {
      $('name').activate();
    }
  },
  save_values: function() {
    var theForm = $(this.formName);
    var fieldNames = $H(this.node.options.fields).keys();
    console.log( this.node.options.fields );
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
  
  show: function(node) {
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('palette').stopObserving('click');
    }
    
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
      this.node.options.selected=true;
    }
    else {
      $('palette').hide();
      $(this.node.bodyEl).addClassName('selected');
    }
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
    
    if(realEngineNode){ // A Node was clicked.
      
      // Store the real engineNode to be controlled through the form
      var ctrlEngineNode     = this.node.module.engineNode;
      
      // Grab form inputs
      var ctrlFormEnergy     = this.form_observer.element.energy;
      var ctrlFormInputRate  = this.form_observer.element.inputRate;
      var ctrlForm_FORM      = this.form_observer.element.form;
      var ctrlFormEfficiency = this.form_observer.element.efficiency;


      // Link energy fields to energy properties of enginNodes
      ctrlFormEnergy.onchange = function(){
         ctrlEngineNode.energy = parseFloat( ctrlFormEnergy.value );
         WireIt.myRedraw();
      }   
        
      ctrlFormInputRate.onchange = function(){ 
         ctrlEngineNode.inputRate = parseFloat( ctrlFormInputRate.value );
         WireIt.myRedraw();
      }
      
      ctrlFormEfficiency.onchange = function(){

         ctrlEngineNode.efficiency = parseFloat( ctrlFormEfficiency.value );
         WireIt.myRedraw();
      }
      
    }else{
      // A Wire was clicked, do nothing to engine.
    }
 
  }

}

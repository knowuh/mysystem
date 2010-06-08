(function() {

 /*********************************/
  Array.prototype.removeAt = function (index) {
    if (this.length > index && index >= 0) this.splice(index,1);
  };

 /*********************************/
  Array.prototype.removeObject = function(object) {
    var objIndex = this.indexOf(object);
    if (objIndex > -1) {
      this.removeAt(objIndex);
    };
  };

 /*********************************/
  Array.prototype.indexOf = function(object) {
    var obj;
    for (var i = 0; i < this.length; i++) {
      obj = this[i];
      if (obj === object) {
        return i;
      };
    };
    return -1;
  };

 /*********************************/
  Array.prototype.addUnique = function(object) {
    var objIndex = this.indexOf(object);
    if (objIndex < 0) {
      return this.push(object);
    };
    return this.length;
  };


 /*********************************
  * constructor
  *********************************/
 if (typeof Story == "undefined") Story = {};

 Story.StoryPart = function(opts) {
  this.config = {
    selectedClass:      "selected",
    clickEvent:         "click.story",
    dblclickEvent:      "dblclick.story",
    hoverEvent:         "hover.story",
    text:               "default_story_part"
  };
  if (opts) $.extend(this.config, opts);
  this.data = {};
  this.data.domElements = [];
  this.data.text = this.config.text;
 };
 
 
 /*********************************/
 Story.StoryPart.prototype.select = function() {
   var domItem;
   for (var i = 0; i < this.data.domElements.length; i++) {
     domItem = this.data.domElements[i];
     domItem.addClass(this.config.selectedClass);
   };
 };

 /*********************************/
 Story.StoryPart.prototype.deselect = function() {
   var domItem;
   alert("de selected: " + this.getText());
   for (var i = 0; i < this.data.domElements.length; i++) {
     domItem = this.data.domElements[i];
     domItem.removeClass(this.config.selectedClass);
   };
 };

 /*********************************/
 Story.StoryPart.prototype.addDomElement = function(element) {
   this.data.domElements.addUnique(element);
 };

 /*********************************/
 Story.StoryPart.prototype.removeDomElement = function(element) {
   this.data.domElements.removeObject(element);
 };

 /*********************************/
 Story.StoryPart.prototype.setText = function(_text) {
   alert(_text);
   this.data.text = _text;
 };
 

 /*********************************/
 Story.StoryPart.prototype.getText = function(_text) {
   return this.data.text;
 };

})();

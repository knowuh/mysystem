function debug(message) {
  // if (console && console.log) {
  //   console.log(message);
  // } 
}

// let the monkey patching begin!
WireIt.Layer.prototype.setOptions = function(options) {
  var defaults = {
    className: 'WireIt-Layer',
    parentEl: document.body,
    containers: [],
    wires: [],
    layerMap: false,
    enableMouseEvents: true
  }
  defaults = $H(defaults);
  this.options = defaults.merge($H(options)).toObject();
  debug("loaded defaults for wire-it layer");
  debug(this.options.parentEl);
};
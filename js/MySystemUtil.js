(function() {
  debug = function(message) {
    window.console && console.log && console.log(message);
  }

  if (window.WireIt && window.WireIt.Layer) {
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
  }
})();

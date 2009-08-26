(function() {
  // Very simple proxy for the VLE
  VLEDSService = function(_vle){
    this.data = "";
    this.vle = _vle
  };

  VLEDSService.prototype = {
    save: function(_data) {
        this.vle.saveHtmlState(_data);
        this.data = _data;
    },

    load: function(context,callback) {
      this.data = this.vle.getLatestHtmlState();
      callback(this.data,context);  
    },

    toString: function() {
      return "VLE Data Service (" + this.vle + ")"; 
    }
  };

})();
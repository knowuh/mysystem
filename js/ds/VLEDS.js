(function() {
  // Very simple proxy for the VLE
  VleDS = function(_vle){
    this.data = "";
    this.vle = _vle
    this.vleNode=_vle.getCurrentNode();
  };

  VleDS.prototype = {
    save: function(_data) {
        this.vle.saveState(_data,this.vleNode);
        this.data = _data;
    },

    load: function(context,callback) {
      this.data = this.vle.getLatestStateForCurrentNode();
      callback(this.data,context);  
    },

    toString: function() {
      return "VLE Data Service (" + this.vle + ")"; 
    }
  };

})();
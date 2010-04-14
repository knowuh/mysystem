(function() {
  // A Moc DatService, which does not require a backend at all.
  MocDS = function(one,two){
    this.data = "[]";
    debug ("new " + this + " created")
  };

  MocDS.prototype = {
    save: function(_data) {
        debug("Moc Saving ...")
        this.data = _data;
    },

    load: function(context,callback) {
      debug("Moc Loading ... ")
      callback(this.data,context);
    
  	},
  	toString: function() {
  	  var dataString = this.data.substr(0,50);
  	  return "Moc Data Service (" + dataString + ")";
  	}
  };
})();
(function(){
  DSService = function(readKey,writeKey,_post_path){
    this.data = "";
    this.postPath = _post_path || "/models/"
    this.setKeys(readKey,writeKey);
  };

  DSService.prototype = {
    setKeys: function(read,write) {
      if (read) {
        this.load(this,function(){});// just load data
        this.readKey = read;
      }
      if (write) {
        this.writeKey = write;
      }
      else {
        this.writeKey= new UUID().toString();
      }
    },
    // write the data
    save: function(_data) {
        this.data = _data
        var post_to = this.postPath + "/" + this.writeKey;
        var xmlhttp = HTTP.newRequest();
        xmlhttp.open('PUT', post_to, false);
        xmlhttp.send(this.data);
        this.readKey = this.writeKey;
    },

    load: function(context,callback) {
      var get_from = this.getPath + "/" + this.writeKey;
      var self = this;
  	  if (this.readKey) {
  	    HTTP.getText(this.dataDir + "/" + this.options.modelId, self, this.load_callback); 
      }
      else {
        debug("load caleld, but no read key specified...");
      }
  	},
  	
  	// we do this to capture the data locally too...
  	load_callback: function(_data,context,callback) {
  	  self.data = _data;
  	  callback(data,context,callback);
  	},
  	
  	toString: function() {
  	  return "Data Service (" + this.postPath + "" + this.writeKey + ")";
  	}
  };
})();
(function(){
  RestDS = function(readKey,writeKey,_post_path){
    this.data = "";
    this.enableLoadAndSave = true;
    this.postPath = _post_path || "/models/";
    this.getPath = this.postPath;
    this.setKeys(readKey,writeKey);
  };

  RestDS.prototype = {
    setKeys: function(read,write) {
      if (read) {
        this.load(this,function(){});// just load data
        this.readKey = read;
      }
      if (write) {
        this.writeKey = write;
      }
      else {
        this.writeKey= this.randomString();
        this.readKey = this.writeKey;
      }
    },
    randomString: function() {
    	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    	var string_length = 8;
    	var randomstring = '';
    	for (var i=0; i<string_length; i++) {
    		var rnum = Math.floor(Math.random() * chars.length);
    		randomstring += chars.substring(rnum,rnum+1);
    	}
    	return randomstring;
    },
    // write the data
    save: function(_data) {
        this.data = _data;
        var post_to = this.postPath + this.writeKey;
        var xmlhttp = HTTP.newRequest();
        xmlhttp.open('PUT', post_to, false);
        xmlhttp.send(this.data);
        this.readKey = this.writeKey;
        $('readKey').update("Your Key:" + this.readKey);
        debug("readKey written: " + this.readKey);
    },
    
    load: function(context,callback) {
      var get_from = this.getPath  + this.writeKey;
      var self = this;
      var key = prompt("load what system-key?: ", this.readKey);
      this.writeKey = key;
      this.readKey = key;
      debug("just about to load with " + key);
  	  if (key) {
  	    self = this;
        new Ajax.Request(get_from, {
          asynchronous: true,
          method: 'GET',
          onSuccess: function(rsp) {
            var text = rsp.responseText;
            var _data = eval(text);
            self.data = _data;
            callback(_data,context,callback);
            debug("returned from load");
          },
          onFailure: function(req,err) {
            debug("failed!");
          }
        });
      }
      else {
        debug("load caleld, but no read key specified...");
      }
  	},
  	
  	
  	toString: function() {
  	  return "Data Service (" + this.postPath + "" + this.writeKey + ")";
  	}
  };
})();
(function(){
    
  RestDS = function(readKey,writeKey,_post_path){
    this.data = '[]';
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
        this.writeKey = prompt("Please enter a model name or key: ", this.writeKey);
        this.data = _data;
        var post_to = this.postPath + this.writeKey;
        var xmlhttp = HTTP.newRequest();
        xmlhttp.open('PUT', post_to, false);
        xmlhttp.send(this.data);
        this.readKey = this.writeKey;
        debug("readKey written: " + this.readKey);
    },
    
    promptKey: function() {
      
    },
    load: function(context,callback) {
      if (this.readKey) {
        var key = prompt("Please enter the model to load: ", this.readKey);
        this.writeKey = key;
        this.readKey = key;
      }
      else {
        if (this.writeKey) {
          this.readKey = this.writeKey;
        }
        else {
          this.readKey = this.writeKey = this.randomString();
        }
      }
      var get_from = this.getPath  + this.readKey;
      var self = this;
      debug("just about to load with " + this.readKey);
  	  if (this.readKey) {
  	    self = this;
        $.ajax({
          url: get_from,
          async: true,
          type: 'GET',
          success: function(rsp) {
            var _data = rsp;
            self.data = _data;
            callback(_data, context, callback);
            debug("returned from load");
          },
          error: function(req,err) {
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
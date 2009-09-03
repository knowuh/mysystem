// @requires <prototype>
// @requires "MySystemUtils"
(function() {
  
  /**
  * @constructor
  */
  CookieDS = function(readKey, writeKey, _days) {
    this.data = "";
    this.days = _days || 14;
    this.setKeys(readKey, writeKey);
  };

  /**
  * set the keys
  */
  CookieDS.prototype.setKeys = function(read, write) {
    if (read) {
      this.load(this,
        function() {});
        // just load data
        this.readKey = read;
      }
      if (write) {
        this.writeKey = write;
      }
      else {
        this.writeKey = new UUID().toString();
      }
    };

    /**
    * write the data
    */
    CookieDS.prototype.save = function(_data) {
      this.data = _data
      this.readKey = this.writeKey;
      eraseCookie(this.writeKey);
      createCookie(this.writeKey,_data,this.days);
    };

    /**
    * load the data
    */
    CookieDS.prototype.load = function(context, callback) {
      var self = this;
      if (this.readKey) {
        var cookie_data = readCookie(this.readKey);
        if (cookie_data) {
          this.data = cookie_data;
        }
        else {
          debug("cookie contained nothing");
        }
        callback(this.data,context);
      }
      else {
        debug("load caleld, but no read key specified...");
      }
    };

    /**
    *  to string
    */
    CookieDS.prototype.toString = function() {
      return "Cookie Data Service (" + this.writeKey + ")";
    };


})();
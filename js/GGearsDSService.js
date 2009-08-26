// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function() {
  // We are already defined. Hooray!
  if (window.google && google.gears) {
    return;
  }

  var factory = null;

  // Firefox
  if (typeof GearsFactory != 'undefined') {
    factory = new GearsFactory();
  } else {
    // IE
    try {
      factory = new ActiveXObject('Gears.Factory');
      // privateSetGlobalObject is only required and supported on IE Mobile on
      // WinCE.
      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
        factory.privateSetGlobalObject(this);
      }
    } catch (e) {
      // Safari
      if ((typeof navigator.mimeTypes != 'undefined')
           && navigator.mimeTypes["application/x-googlegears"]) {
        factory = document.createElement("object");
        factory.style.display = "none";
        factory.width = 0;
        factory.height = 0;
        factory.type = "application/x-googlegears";
        document.documentElement.appendChild(factory);
      }
    }
  }

  // *Do not* define any objects if Gears is not installed. This mimics the
  // behavior of Gears defining the objects in the future.
  if (!factory) {
    return;
  }

  // Now set up the objects, being careful not to overwrite anything.
  //
  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
  // the window object. However, global objects are automatically added as
  // properties of the window object in all browsers.
  if (!window.google) {
    google = {};
  }

  if (!google.gears) {
    google.gears = {factory: factory};
  }
})();


(function(){
  GGearsDSService = function(readKey,writeKey,_table){
    this.data = "";
    this.table = _table || "models";
    this.db = this.table;
    this.setKeys(readKey,writeKey);
  };

  GGearsDSService.prototype = {
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
    
    open_db: function() {
      // this line is not working, something about factory.create needs to be investigated:
      this.db_connection = google.gears.factory.create(this.db);
      this.db_connection.open(this.db);
      this.db_connection.execute (
        'create table if not exists ' + this.table +
        ' (key string, content text, Timestamp int)'
      );
    },
    
    // write the data
    save: function(_data) {
      debug(this + " save called");
      this.data = _data;
      this.open_db();
      // this.db_connection.execute('insert into ' + this.table + ' values (?, ?, ?)', [this.writeKey, this.data , new Date().getTime()]);
      // debug(this + " save done");
    },

    load: function(context,callback) {
      debug(this + " loading");
      var get_from = this.getPath + "/" + this.writeKey;
      var self = this;
  	  if (this.readKey) {
        this.open_db();
        var rs = this.db_connection.execute('select * from ' + this.table + ' order by Timestamp desc');
        if (rs.isValidRow()) {
          debug(this + " found valid row data");
          this.load_callback(rs.field(1),context,callback)
        }
        rs.close();
        debug(this + " load done");
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
  	  return "Gears Data Service (" + this.table + ":" + this.writeKey + ")";
  	}
  };
})();
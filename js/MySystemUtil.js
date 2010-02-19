(function() {
  
  
  /**
  *
  */
  debug = function(message) {
    window.console && console.log && console.log(message);
  };

  
  periodicallyCall = function(_fun,context,intervalms) {
      setTimeout(function() {
        _fun.call(context);
        periodicallyCall(_fun,context,args,intervalms);
      }, intervalms);
      
      
  };
  
  /**
  *
  */
  createCookie = function(name,value,days) {
    if (!days) {
      days = 14;
    }
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
  };


  /**
  *
  */
  readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };


  /**
  *
  */
  eraseCookie = function (name) {
    createCookie(name,"",-1);
  };
  
  
  /**
  *
  */
  if (window.WireIt && window.WireIt.Layer) {
    WireIt.Layer.prototype.setOptions = function(options) {
      var defaults = {
        className: 'WireIt-Layer',
        parentEl: document.body,
        containers: [],
        wires: [],
        layerMap: false,
        enableMouseEvents: true
      };
      defaults = $H(defaults);
      this.options = defaults.merge($H(options)).toObject();
      debug("loaded defaults for wire-it layer");
      debug(this.options.parentEl);
    };
  };
  
  /**
  * Wraps buffer to selected number of characters using string break char
  * Modified from: http://phpjs.org/functions/wordwrap (License: MIT || GPL)
  * @method wordWrap(m,b,c)
  * @args 
  *   wrap_width = how many characters to wrap at, 
  *   break_character = character to use for line breaks.
  *   cut_words = whether to allow splitting of words. (does this work)
  *
  */
  String.prototype.wordWrap = function(wrap_width, break_character, cut_words){
      var m = ((arguments.length >= 1) ? arguments[0] : 75   );
      var b = ((arguments.length >= 3) ? arguments[1] : "\n" );    
      var c = ((arguments.length >= 4) ? arguments[2] : false);
    
      var i, j, s, r = this.split("\n");
      if(m > 0) for(i in r){
          for(s = r[i], r[i] = ""; s.length > m;
              j = c ? m : (j = s.substr(0, m).match(/\S*$/)).input.length - j[0].length
              || m,
              r[i] += s.substr(0, j) + ((s = s.substr(j)).length ? b : "")
          );
          r[i] += s;
      }
      return r.join("\n");
  };
  
  
})();

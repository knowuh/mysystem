// fake change to this file for git exmple...
(function(){
  
  this.MySystem = function( jsonURL ){ 
    this.init( jsonURL );
    this.interceptKeys();
  };
  
  MySystem.prototype = {
    init: function( jsonURL ) {
      this.loadModules( jsonURL );
    },
    
    setDataService: function(ds) {
      this.dataService=ds;
      if (this.editor) {
        this.editor.dataService = this.dataService;
      }
    },
    
    interceptKeys: function() {
      document.observe('keydown', function(e){
        var code;
        var element = $(e.element());
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        if (code == 8 || code == 127) {
          if ( !element.match('input')) {
              e.stop();
          } 
        }
      });
    },
    setEditor: function(_editor) {
      debug("new editor being set");
      if (_editor) {  
        this.editor = _editor;
      }
      else {
        debug("new editor set");
        this.editor = new MySystemEditor(this.data);
      }
      this.editor.dataService = this.dataService;
    },
    
    loadModules: function(filename) {
      var self = this;
      debug("calling loadModules (with GET)" + filename);
      new Ajax.Request(filename, {
        asynchronous: false,
        method: 'GET',
        onSuccess: function(rsp) {
          var text = rsp.responseText;
          var _data = eval(text);
          debug("content: "+ text);
          debug("data: " + _data);
          self.data = new MySystemData();
          self.data.setData(_data,[],true);
          self.setEditor();
          self.loaded=true;
        },
        onFailure: function(req,err) {
          debug("failed!");
        }
      });
    },
    
    /**
    * Tell the editor to load data from the dataService.
    * @method load
    */
    load: function() {
      this.editor.onLoad();
    },
    /**
    * Tell the editor to save data to the dataService.
    * @method save
    */
    save: function() {
      this.editor.onSave();
    }
    

  }
  
})();

(function(){
  
  this.MySystem = function( jsonURL ){ 
    this.init( jsonURL );
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
      debug("calling loadModules " + filename);
      new Ajax.Request(filename, {
        asynchronous: false,
        onSuccess: function(rsp) {
          var text = rsp.responseText;
          var _data = eval(text);
          debug("content: "+ text);
          debug("data: " + _data);
          self.data = new MySystemData();
          self.data.setData(_data,[],true);
          self.setEditor();
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

// fake change to this file for git exmple...
(function(){
  
  this.MySystem = function( moduleUrl ){ 
    this.init( moduleUrl );
    this.interceptKeys();
  };
  
  MySystem.prototype = {
    init: function( jsonURL ) {
      this.loadPreferences( jsonURL );
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
    
    loadPreferences: function(filename) {
      var self = this;
      debug("calling loadPreferences (with GET)" + filename);
      new Ajax.Request(filename, {
        asynchronous: false,
        method: 'GET',
        onSuccess: function(rsp) {
          var text = rsp.responseText;
          var _data = eval(text);
          var modules = _data.findAll(function(item) {
            return (item.xtype && item.xtype == 'MySystemContainer');
          });
          debug("json text content: "+ text);
          debug("modules: " + modules);
          self.data = new MySystemData();
          self.data.setData(modules,[],true);
          self.setEditor();
          
          var labelMap = _data.findAll(function(item) {
            return (item.xtype && item.xtype == 'PropEditorFieldLabels');
          });
          if (labelMap.size() > 0) {
            self.editor.propEditor.setFieldLabelMap(labelMap.entries()[0].labels);
          }
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

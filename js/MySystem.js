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
          if ((! element.match('input')) && (! element.match('textarea'))) {
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
      debug("calling loadPreferences (with GET) " + filename);
      new Ajax.Request(filename, {
        asynchronous: false,
        method: 'GET',
        onSuccess: function(rsp) {
          var _data = null;
          var modules = [];
          var labels = null;
          try {
            var _data = rsp.responseText.evalJSON();
            var modules = [];
            var labels = null;
            _data.each(function(item) {
              if (item.xtype == 'MySystemContainer') {
                modules.push(item);
              }
              else if (item.xtype == 'PropEditorFieldLabels') {
                labels = item.labels;
              }
              else if (item.xtype == 'AssignmentInformation') {
                self.loadAssignmentInfo(item);
              }
            });
          }
          catch(exception) {
            debug("unable to load / read file: " + filename);
            debug(exception);
          }
          self.loadModules(modules);
          self.setEditor();
          if (labels) {
            self.editor.propEditor.setFieldLabelMap(labels);
          }
          self.loaded = true;
        },
        onFailure: function(req,err) {
          debug("failed!");
        }
      });
    },
    
    loadModules: function(modules) {
      this.data = new MySystemData();
      this.data.setData(modules, [], true);
    },
    
    loadAssignmentInfo : function(item) {
      $('goal_panel_text').update(item.fields.goal);
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

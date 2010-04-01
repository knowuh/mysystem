// fake change to this file for git exmple...
(function(){
  
  this.MySystem = function( moduleUrl ){ 
    if (moduleUrl != null) { 
      this.init( moduleUrl );
    }
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
      $(document).keydown(function(e){
        var code;
        var element = $(e.element());
        if (e.charCode) code = e.charCode;
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
      // debug("calling loadPreferences (with GET) " + filename);
      // $.get(filename, function(data) {
      //  self.loadModulesFromJSON(data);
      //  alert("loaded -- ");
      // });
      // 
      self.loadModulesFromJSON($.ajax({ type: "GET", url: filename, async: false }).responseText);
            // 
            // new Ajax.Request(filename, {
            //   asynchronous: false,
            //   method: 'GET',
            //   onSuccess: function(rsp) {
            //     self.loadModulesFromJSON(rsp.responseText);
            //   },
            //   onFailure: function(req,err) {
            //     debug("failed!");
            //   }
            // });
    },
    
    loadModulesFromJSON: function(jsonString) {
        debug("calling loadModulesFromJSON:" + jsonString);
        var _data = null;
        var modules = [];
        var arrows = null;
        var labels = null;
        var self = this;
        try {
          
          var _data = JSON.parse(jsonString);
          
          // Look for an object named "modules".
          // if present we are being loaded from wise4
          if (typeof _data.modules != "undefined") {
            _data = _data.modules;
          }
          
          var modules = [];
          var labels = null;
          var item;
          for (var item_index in _data) {
            item = _data[item_index];
            if (item.xtype == 'MySystemContainer'
            ||  item.xtype == 'MySystemNote') {
              modules.push(item);
            }
            else if (item.xtype == 'PropEditorFieldLabels') {
              labels = item.labels;
            }
            else if (item.xtype == 'PropEditorArrows') {
              arrows = item.arrows;
            }
            else if (item.xtype == 'AssignmentInformation') {
              self.loadAssignmentInfo(item);
            }
          }
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
        if (arrows) {
          self.editor.propEditor.setArrows(arrows);            
        }
        self.loaded = true;
    },
    // loadModulesFromJSON: function(jsonString) {
    //   var self = this;
    //   debug("calling loadModulesFromJSON:" + jsonString);
    //   var jsonObj = JSON.parse(jsonString);
    //   var _data = jsonObj.modules;
    //   debug("data: " + _data);
    //   self.data = new MySystemData();
    //   self.data.setData(_data,[],true);
    //   self.setEditor();
    // },
      
    loadModules: function(modules) {
      this.data = new MySystemData();
      this.data.setData(modules, [], true);
    },
    
    loadAssignmentInfo : function(item) {
      $('#goal_panel_text').text(item.fields.goal);
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

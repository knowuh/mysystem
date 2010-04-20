mysystem.MySystem = function (jsonUrl) {
    this.loaded = false;
    this.datasService = null;
    this.editor = null;
    this.data = new MySystemData();
    if (jsonUrl) { 
        this.initURL(jsonUrl);
    }
    this.interceptKeys();
};

mysystem.MySystem.prototype = {

    initURL: function (jsonURL) {
        var loaded = this.loadModulesFromJSON($.ajax({ type: "GET",
            url: jsonURL, async: false }).responseText);
        
        this.data.setData(loaded.modules, [], true);
        this.editor = new mysystem.MySystemEditor(this.data);

        if (loaded.labels) {
            this.editor.propEditor.setFieldLabelMap(loaded.labels);
        }
        if (loaded.arrows) {
            this.editor.propEditor.setArrows(loaded.arrows);
        }
    },
  
    setDataService: function (ds) {
        this.dataService = ds;
        if (this.editor) {
            this.editor.setDataService(ds);
        }
    },

    interceptKeys: function () {
        $(document).keydown(function (e) {
            var code = e.which;
            var element = $(e.target);
            var backspaceKey = 8;
            var delKey = 127;

            if (code == backspaceKey || code == delKey) {
                if ((! element.is('input')) && (! element.is('textarea'))) {
                    e.preventDefault();
                }
            }
        });
    },

    loadModulesFromJSON: function (jsonString) {
        debug("Calling loadModulesFromJSON:" + jsonString);
        var retObj = { modules: [], labels: null, arrows: null };
        
        try {
            var data = JSON.parse(jsonString);

            // Look for an object named "modules".
            // if present we are being loaded from wise4
            if (typeof data.modules !== 'undefined') {
                data = data.modules;
            }

            var item = null;
            
            for (var item_index in data) {
                item = data[item_index];
                if (item.xtype == 'MySystemContainer' ||
                    item.xtype == 'MySystemNote')
                {
                    retObj.modules.push(item);
                }
                else if (item.xtype == 'PropEditorFieldLabels') {
                    retObj.labels = item.labels;
                }
                else if (item.xtype == 'PropEditorArrows') {
                    retObj.arrows = item.arrows;
                }
                else if (item.xtype == 'AssignmentInformation') {
                    this.loadAssignmentInfo(item);
                }
            }
            this.loaded = true;
        }
        catch(exception) {
            alert('Unable to load/read file: ' + filename);
            alert(exception);
        }
        finally {
            return retObj;
        }
    },

    loadAssignmentInfo : function (item) {
        $('#goal_panel_text').html(item.fields.goal);
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

};

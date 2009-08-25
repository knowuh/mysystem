(function(){
  DSService = function(readKey,writeKey,_post_path){
    this.data = "";
    this.postPath = _post_path || "/models/"
    this.setKeys(readKey,writeKey);
  };

  DSService.prototype = {
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
    save: function(_data) {
        this.data = _data
        var post_to = this.postPath + "/" + this.writeKey;
        var xmlhttp = HTTP.newRequest();
        xmlhttp.open('PUT', post_to, false);
        xmlhttp.send(this.data);
        this.readKey = this.writeKey;
    },

    load: function(context,callback) {
      var get_from = this.getPath + "/" + this.writeKey;
      var self = this;
  	  if (this.readKey) {
  	    HTTP.getText(this.dataDir + "/" + this.options.modelId, self, this.load_callback(context,callback));
      }
      else {
        debug("load caleld, but no read key specified...");
      }
  	},

  	load_callback: function(_data,context,callback) {
  	  self.data = _data;
  	  callback(data,context,callback);
  	},

  	toString: function() {
  	  return "Data Service (" + this.postPath + "" + this.writeKey + ")";
  	}
  };
})();
(function() {
  MocDSService = function(one,two){
    this.data = "";
    debug ("new " + this + " created")
  };

  MocDSService.prototype = {
    save: function(_data) {
        debug("Moc Saving ...")
        this.data = _data;
    },

    load: function(context,callback) {
      debug("Moc Loading ... ")
      callback(this.data,context);

  	},
  	toString: function() {
  	  var dataString = this.data.substr(0,50);
  	  return "Moc Data Service (" + dataString + ")";
  	}
  };
})();
    var testData = [
  	{
  		'name'				: 'sun',
      'icon'				: "./images/sun.png",
      'image'				: "./images/sun.png",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'source',
      'fields'			: {
      									'energy'			: 100,
      									'form'				: 'light',
      									'efficiency'	: 1
      								}
  	},
  	{
  		'name'				: 'space',
      'icon'				: "./images/space.jpg",
      'image'				: "./images/space.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: 1
      								}
  	},
  	{
  		'name'				: 'earth',
      'icon'				: "./images/world.png",
      'image'				: "./images/world.png",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .5,
      									'form'				: 'light',
      									'efficiency'	: .2
      								}

  	},
  	{
  		'name'				: 'grass',
      'icon'				: "./images/grass.jpg",
      'image'				: "./images/grass.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .15,
      									'form'				: 'chemical',
      									'efficiency'	: .2
      								}
  	},
  	{
  		'name'				: 'bugs-fungi',
      'icon'				: "./images/bugs.jpg",
      'image'				: "./images/bugs.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .1,
      									'form'				: 'chemical',
      									'efficiency'	: .1
      								}
  	},
  	{
  		'name'				: 'rabbit',
      'icon'				: "./images/rabbit.jpg",
      'image'				: "./images/rabbit.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .2,
      									'form'				: 'chemical',
      									'efficiency'	: .15
      								}
  	},
  	{
  		'name'				: 'owl',
      'icon'				: "./images/owl.jpg",
      'image'				: "./images/owl.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .2,
      									'form'				: 'chemical',
      									'efficiency'	: .15,
      								}
  	},
  	{
  		'name'				: 'fox',
      'icon'				: "./images/fox.jpg",
      'image'				: "./images/fox.jpg",
      'xtype'				: "MySystemContainer",
  		'etype'				: 'node',
      'fields'			: {
      									'inputRate'		: .18,
      									'form'				: 'chemical',
      									'efficiency'	: .1
      								}
  	}
  ];


  var MySystem = function(){
    this.init();
  };

  MySystem.prototype = {
    init: function() {
      try {
        this.data = new MySystemData();
        this.data.setData(testData,[],true);
        this.editor = new MySystemEditor(this.data);
      }
      catch (e){
        debug("error initializing MySystemDemo: " + e.name + " " + e.message)
      }
    },

    setDataService: function(ds) {
      this.editor.dataService=ds;
    },

    /**
    * Execute the module in the "ExecutionFrame" virtual machine
    * @method run
    * @static
    */
    run: function() {
        var ef = new ExecutionFrame(this.editor.getValue());
        ef.run();
    }
  }


/**
 * MySystem Container. Has an image. and double_click beahvor.
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
MySystemContainer = function(options, layer) {
   MySystemContainer.superclass.constructor.call(this, options, layer);
   this.title = options.name || "MySystem Container";
   this.icon = options.icon;
   this.options.fields = options.fields || {'name': options.name, 'energy': 10};
   this.has_sub = options.has_sub || false;
   this.subSystem =  null;
   if (options.subsystem_options != null) {
	   this.subSystem = new WireIt.Layer(options.subsystem_options);
	   this.subSystem.setWiring(options.subsystem_wiring);
	   MySystemContainer.openContextFor.fire(this);
   }
   this.options.xtype = "MySystemContainer";
   this.propEditor = null;

   if (this.options.position) {
     debug($(this.options.position).inspect());
     $(this.el).setStyle({
       position: 'absolute',
       left: this.options.position[0],
       top: this.options.position[1]
     });

    }
   YAHOO.util.Event.addListener(this.el, "dblclick", this.onDblClick, this, true);
   YAHOO.util.Event.addListener(this.el, "mouseup", this.onMouseUp, this, true);
   this.setTitle(this.options.fields.name);
};


YAHOO.lang.extend(MySystemContainer, WireIt.ImageContainer, {
  onMouseUp: function(source) {
    MySystemContainer.openPropEditorFor.fire(this);
  },

  onDblClick: function(source) {
    if (this.has_sub) {
      MySystemContainer.openContextFor.fire(this);
    }
  },

  setTitle: function(newTitle) {
    if(newTitle) {
      var this_el = this.el
      var title_el = $(this_el).down('.title')
      this.title = newTitle;
      this.options.name = this.title;
      if(!title_el) {
        title_el = this.createTitle()
        this_el.insert(title_el);
      }
      title_el.update(this.title);
    }
  },
  createTitle: function() {
    return new Element('div', {
      'class': 'title'
    });
  },
  render: function() {
    MySystemContainer.superclass.render.call(this);
    var this_el = this.el
    var title_el = $(this_el).down('.title')
    if(!title_el) {
      title_el = this.createTitle()
      this_el.insert(title_el);
      title_el.update(this.title);
    }

  },
  updateFields: function() {
    debug(($H(this.options.fields).inspect()));
    this.setTitle(this.options.fields.name);
  },

  getConfig: function() {
	  var super_options = MySystemContainer.superclass.getConfig.call();
	  this.options.name = this.title;
	  this.options.has_sub = this.has_sub;
	  if (this.subSystem != null) {
		  this.options.subsystem_options = this.subSystem.options;
		  this.options.subsystem_wiring = this.subSystem.getWiring();
	  }
	  this.options.position[0] = this.el.getStyle('left');
	  this.options.position[1] = this.el.getStyle('top');
	  return $H(super_options).merge($H(this.options));
  }
});

MySystemContainer.openPropEditorFor  = new YAHOO.util.CustomEvent("OpenEditorFor");
MySystemContainer.openContextFor = new YAHOO.util.CustomEvent("openContextFor");









/**
 *
 */
var MySystemData = Class.create({
  initialize:function() {
    this.modules = [];
  this.instances = [];
  },

  addModule: function(module,addTerminals) {
    if (addTerminals) {
      module.terminals = MySystemData.defaultTerminals();
    }
    this.modules.push(module)
  },

  setModules: function (modules,addTerminals) {
    this.modules = [];
    modules.each(function(m){
      this.addModule(m,addTerminals);
    }.bind(this));
  },

  setInstances: function(instances) {
    this.instances = [];
    instances.each(function(i){
      this.addInstance(i);
    }.bind(this))
  },

  addInstance : function(instance) {
    this.instances.push(instance);
  },

  setData: function (modules,instances,addTerminals) {
    this.setModules(modules,addTerminals);
    this.setInstances(instances);
  }
});


MySystemData.defaultTerminals = function() {
  return [{
       "wireConfig": {
         "drawingMethod": "bezierArrows"
       },
       "name": "Terminal1",
       "direction": [0, -1],
       "offsetPosition": {
       "left": 20,
       "top": -25
       },
       "ddConfig" : {
           "type": "input",
           "allowedTypes": ["input", "output"]
       }
   },{
       "wireConfig": {
           "drawingMethod": "bezierArrows"
       },
       "name": "Terminal2",
       "direction": [0, 1],
       "offsetPosition": {
           "left": 20,
           "bottom": -25
       },
       "ddConfig": {
           "type": "output",
           "allowedTypes": ["input", "output"]
       }
   }];
}


(function() {
    var util = YAHOO.util;
    var lang = YAHOO.lang;
    var Event = util.Event;
    var Dom = util.Dom;
    var Connect = util.Connect;
    var JSON = lang.JSON;
    var widget = YAHOO.widget;

    /**
   * Proxy to handle the drag/dropping from the module list to the layer
   * @class MySystemDragAndDropProxy
   * @constructor
   * @param {HTMLElement} el
   * @param {MySystemEditor} WiringEditor
   */
    MySystemDragAndDropProxy = function(el, MySysEditor) {
        this._MySysEditor = MySysEditor;
        MySystemDragAndDropProxy.superclass.constructor.call(this, el, "module", {
            dragElId: "moduleProxy"
        });
        this.isTarget = false;
    };

    YAHOO.extend(MySystemDragAndDropProxy, YAHOO.util.DDProxy, {

        /**
        * copy the html and apply selected classes
        * @method startDrag
        */
        startDrag: function(e) {
            MySystemDragAndDropProxy.superclass.startDrag.call(this, e);
            var del = this.getDragEl();
            var lel = this.getEl();
            del.innerHTML = lel.innerHTML;
            del.className = lel.className;
        },

        /**
        * Override default behavior of DDProxy
        * @method endDrag
        */
        endDrag: function(e) {},

        /**
        * Add the module to the WiringEditor on drop on layer
        * @method onDragDrop
        */
        onDragDrop: function(e, ddTargets) {
            var layerTarget = ddTargets[0];
            var layer = ddTargets[0]._layer;
            var del = this.getDragEl();
            var pos = YAHOO.util.Dom.getXY(del);
            var layerPos = YAHOO.util.Dom.getXY(layer.el);
            pos[0] = pos[0] - layerPos[0];
            pos[1] = pos[1] - layerPos[1];
            this._MySysEditor.addModule(this._module, pos);

            console.log( this._module );

            var energyForm = {};
            energyForm[ this._module.fields.form ] = this._module.fields.efficiency;

            my.newNode({
            		name				: this._module.name,
								module			: this._module,
            		type				: this._module.etype,
            		energy			: this._module.fields.energy || 0,
            		inputRate		: this._module.fields.inputRate,
            		efficiency	: energyForm
            });

            my.cycle();
            my.list();

        }
    });

/**
 * The MySystemEditor class provides a full page interface
 * @class WiringEditor
 * @constructor
 * @param {Object} options
 */
    MySystemEditor = function(data) {
        this.setOptions(data);
        this._data = data;
        this.numLayers = 1;
        this.propEditor = new MySystemPropEditor({});

        /**
        * Container DOM element
        * @property el
        */
        this.el = Dom.get(data.parentEl);

      /**
       * @property helpPanel
       * @type {YAHOO.widget.Panel}
       */
        this.helpPanel = new widget.Panel('helpPanel', {
            fixedcenter: true,
            draggable: true,
            visible: false,
            modal: true
        });
        this.helpPanel.render();

        /**
       * @property layout
       * @type {YAHOO.widget.Layout}
       */
        this.layout = new widget.Layout(this.el, this.options.layoutOptions);
        this.layout.render();

        this.buildModulesList();

        this.renderButtons();
    };

    MySystemEditor.prototype = {
        /**
        * @method setOptions
        * @param {Object} options
        */
        setOptions: function(options) {
            this.options = {};
            this.modules = options.modules || ([]);
            this.modulesByName = {};
            for (var i = 0; i < this.modules.length; i++) {
                var m = this.modules[i];
                this.modulesByName[m.name] = m;
            }

            this.options.languageName = options.languageName || 'anonymousLanguage';
            this.options.smdUrl = options.smdUrl || 'WiringEditor.smd'; // eh?

            this.options.dataDir = "/models";
            this.options.propertiesFields = options.propertiesFields;
            this.options.layoutOptions = options.layoutOptions || {
                units: [
                {
                    position: 'top',
                    height: 50,
                    body: 'top'
                },
                {
                    position: 'left',
                    width: 225,
                    resize: true,
                    body: 'left',
                    gutter: '5px',
                    collapse: true,
                    collapseSize: 25,
                    header: 'Objects and Labels',
                    scroll: true,
                    animate: true
                },
                {
                    position: 'center',
                    body: 'center',
                    gutter: '5px'
                },
                {
                    position: 'right',
                    width: 320,
                    resize: true,
                    body: 'right',
                    gutter: '5px',
                    collapse: true,
                    collapseSize: 25,
                    header: 'Properties',
                    scroll: true,
                    animate: true
                }
                ]
            };

            this.options.layerOptions = {};
            var layerOptions = options.layerOptions || {};
            this.options.layerOptions.parentEl = layerOptions.parentEl ? layerOptions.parentEl: Dom.get('center');
            this.options.layerOptions.layerMap = YAHOO.lang.isUndefined(layerOptions.layerMap) ? true: layerOptions.layerMap;
            this.options.layerOptions.layerMapOptions = layerOptions.layerMapOptions || { parentEl: 'layerMap' };

            MySystemContainer.openPropEditorFor.subscribe(this.onOpenPropEditorFor,this,true);
            MySystemContainer.openContextFor.subscribe(this.onOpenContextFor,this,true);
            WireIt.Wire.openPropEditorFor.subscribe(this.onOpenPropEditorFor,this,true);
            this.resetLayers();
        },

        resetLayers: function() {
          if (this.layerStack && this.layerStack.size > 0) {
            for(var i = 0; i < this.layerStack.size();i++) {
              this.removeLayer(this.layerStack[i]);
            }
          }
          if (this.layer) {
            this.removeLayer(this.layer);
          }

          if (this.rootLayer) {
            this.removeLayer(this.rootLayer);
          }
          this.numLayers = 0;
          this.layerStack = [];
          this.rootLayer = this.addLayer();
          this.changeLayer(this.rootLayer);
         },

        onOpenPropEditorFor: function(type,args) {
          module = args[0];
          this.propEditor.show(module);
        },

        onOpenContextFor: function(type,args) {
            module = args[0];
            if (module.has_sub) {
              if (module.subSystem == null) {
                module.subSystem = this.addLayer();
              }
              this.changeLayer(module.subSystem);
            }
        },

        removeLayerMap: function(newLayer) {
          try {
            Event.removeListener(newLayer.layerMap.element, 'mouseup');
            newLayer.layerMap.options.parentEl.removeChild(newLayer.layerMap.element);
            if (this.layerStack.indexOf(newLayer)) {
              this.layerStack[this.layerStack.indexOf(newLayer)]= null;
            }
          }
          catch (e) {
            debug("error removing layer: " + e);
          }
        },

        removeLayer: function(newLayer) {
          this.numLayers = this.numLayers - 1;
          this.removeLayerMap(newLayer);
          newLayer.removeAllContainers();
          newLayer = null;
          return null;
        },

        addLayerMap: function(newLayer) {
          this.layerStack.push(newLayer);
          newLayer.layerMap.options.parentEl.appendChild(newLayer.layerMap.element);
          Event.addListener(newLayer.layerMap.element, 'mouseup', function (e,args) {
             Event.stopEvent(e);
             this.changeLayer(newLayer);
          }, this, true);
        },

      addLayer: function() {
          this.numLayers = this.numLayers + 1;
          var newOpts = Object.clone(this.options.layerOptions);
          newOpts.layerNumber = this.numLayers;
          var newLayer = new WireIt.Layer(newOpts);
          this.addLayerMap(newLayer);
          return newLayer;
        },

        changeLayer: function(newLayer) {
          var index = this.layerStack.indexOf(newLayer);
          if(index < 0) {
            this.addLayerMap(newLayer);
          }
          else {
            for(var i = index+1; i < this.layerStack.size();i++) {
              this.removeLayerMap(this.layerStack[i]);
            }
            this.layerStack = this.layerStack.compact();
          }
          this.setLayer(newLayer)
          this.updateLayerInfo();
        },

        setLayer:function(newLayer) {
          this.cleanWiring(newLayer);
          if (this.layer == null) { this.layer = this.rootLayer;}
      	  var parentDom = this.layer.options.parentEl;
          parentDom.replaceChild(newLayer.el,this.layer.el);
          this.layer.el.hide();

          this.layer = newLayer;
          this.layer.el.show();
          this.setDDLayer(this.layer);
          this.hidePropEditor();
        },
        cleanWiring: function(newLayer) {
          var i = 0;
          var size = newLayer.wires.length;
          var wire = null;
          var removed = 0;
          for (i=0; i <size; i++) {
            wire = newLayer.wires[i];
            if((!(wire.terminal1)) ||!(wire.terminal2)) {
              newLayer.wires[i] = null;
              removed +=1;
            }
          }
          if (removed > 0) {
            debug("removed " + removed + " wires");
            debug("array size pre: " + size);
            newLayer.wires = newLayer.wires.compact();
            debug("array size post: " + newLayer.wires.length);
          }
        },

        updateLayerInfo: function() {
        },

        hidePropEditor: function() {
          $('prop_form').hide();
        },

        setDDLayer: function(theLayer) {
            this.ddTarget = new YAHOO.util.DDTarget(this.layer.el, "module");
            this.ddTarget._layer = this.layer;
        },

        addModuleChoice: function(module) {

            var left = Dom.get('left');
            var div = WireIt.cn('div', {
                className: "WiringEditor-module"
            });

            if (module.icon) {
                var div = WireIt.cn('div', {
                    className: "WiringEditor-icon-module"
                });
                div.appendChild(WireIt.cn('img', {
                    src: module.icon
                }));
            } else {
                var div = WireIt.cn('div', {
                    className: "WiringEditor-module"
                });
                div.appendChild(WireIt.cn('span', null, null, module.name));
            }

            var ddProxy = new MySystemDragAndDropProxy(div, this);
            ddProxy._module = module;
            left.appendChild(div);

            this.setDDLayer(this.layer);
        },


        /**
        * Build the left menu on the left
        * @method buildModulesList
        */
        buildModulesList: function() {
            var modules = this.modules;
            for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                this.addModuleChoice(module);
            }
        },


        /**
        * add a module at the given pos
        * usually invoked by drag-and-drop callbac
        */
        addModule: function(module, pos) {
            try {
                module.position = pos;
                module.title = module.name;
                module.layer = this.layer;
                var container = this.layer.addContainer(module);
                container.setTitle(module.title);
                container.options.position = pos;
                Dom.addClass(container.el, "WiringEditor-module-" + module.name);
            }
            catch(ex) {
            }
        },


        /**
        * Toolbar
        * @method renderButtons
        */
        renderButtons: function() {
            var toolbar = Dom.get('toolbar');
            var newButton = new widget.Button({
                label: "Clear Diagram",
                id: "WiringEditor-newButton",
                container: toolbar
            });
            newButton.on("click", this.onNew, this, true);

            var loadButton = new widget.Button({
                label: "Load",
                id: "WiringEditor-loadButton",
                container: toolbar
            });
            loadButton.on("click", this.onLoad, this, true);

            var saveButton = new widget.Button({
                label: "Save",
                id: "WiringEditor-saveButton",
                container: toolbar
            });
            saveButton.on("click", this.onSave, this, true);

            var helpButton = new widget.Button({
                label: "More Info",
                id: "WiringEditor-helpButton",
                container: toolbar
            });
            helpButton.on("click", this.onHelp, this, true);
        },


        onSMDsuccess: function() { alert("Save successful."); },
        onSMDfailure: function() { alert("Save failed."); },

        /**
        * @method onSave
        */
        onSave: function() {
         if (this.dataService) {
           debug("calling save " + this.dataService);
           this.dataService.save([this.rootLayer.getWiring()].toJSON());
           debug("save has returned... ");
         }
         else {
           alert("No Data Service defined");
         }
        },

        /**
         * @method onSave
         */
         onLoad: function() {
           if (this.dataService) {
             this.dataService.load(this,this.load_callback);
           }
           else {
             alert("No Data Service defined");
           }
         },

         load_callback: function(text, context) {
            debug("===================================\n" + text);
            var obj = eval(text);
            context.resetLayers();
            context.rootLayer.setWiring(obj[0]);
         },



        /**
        * Create a help panel
        * @method onHelp
        */
        onHelp: function() {
            this.helpPanel.show();
        },

        /**
        * @method onNew
        */
        onNew: function() {
            if (confirm("Are you sure you want to erase your diagram and start fresh?")) {
                this.layer.removeAllContainers();
                this.resetLayers();
            }
        },

        /**
        * @method onDelete
        */
        onDelete: function() {
            if (confirm("Are you sure you want to delete this wiring??")) {
                var value = this.getValue();
                this.service.deleteWiring({
                    name: value.name,
                    language: this.options.languageName
                },
                {
                    success: function(result) {
                        alert("Deleted !");
                    }
                });
            }
        },

        /**
        * This method return a wiring within the given vocabulary described by the modules list
        * @method getValue
        */
        getValue: function() {
            var i;
            var obj = {
                modules: [],
                wires: [],
                properties: null
            };

            for (i = 0; i < this.layer.containers.length; i++) {
                obj.modules.push({
                    name: this.layer.containers[i].options.title,
                    value: this.layer.containers[i].getValue(),
                    config: this.layer.containers[i].getConfig()
                });
            }

            for (i = 0; i < this.layer.wires.length; i++) {
                var wire = this.layer.wires[i];
                var wireObj = {
                    src: {
                        moduleId: WireIt.indexOf(wire.terminal1.container, this.layer.containers),
                        terminal: wire.terminal1.options.name
                    },
                    tgt: {
                        moduleId: WireIt.indexOf(wire.terminal2.container, this.layer.containers),
                        terminal: wire.terminal2.options.name
                    }
                };
                obj.wires.push(wireObj);
            }

            obj.properties = this.propertiesForm.getValue();

            return {
                name: obj.properties.name,
                working: obj
            };
        }

    };

})();

/**
 * MySystemPropEditor
 * @class MySystemPropEditor
 * @constructor
 * @param {Object} options
 */
MySystemPropEditor = function(options) {
   this.domID = options.domID || "prop_editor";
   this.formName = options.formName || "prop_form_form";
   this.selected_color = "#000000"
};


MySystemPropEditor.prototype = {
  updateFields: function() {
    var subsTmpl = new Template ('<div class="inputBox"><label for="has_sub">sub systems?</label><input type="checkbox" #{checked} name="has_sub" value="1" id="has_sub"></div>')
    var fieldTmpl = new Template('<div class="inputBox"><label for="#{name}">#{name}</label><input type="text" name="#{name}" value="#{value}" id="#{name}"></div>');
    var fields = [];
    $H(this.node.options.fields).keys().each(function (field_name) {
      if(field_name !='color') {
        fields.push (fieldTmpl.evaluate({name: field_name, value: this.node.options.fields[field_name]}));
      }
    }.bind(this));
    fields.push (subsTmpl.evaluate({checked: (this.node.has_sub ? 'checked="true"' : '')}));
    var fieldText = fields.join("<br/>")
    if (this.node.title) {
      $('prop_name').update("properties for " + this.node.title);
    }
    else {
      $('prop_name').update("properties for wire");
    }
    $('prop_fields').update(fieldText);
    if ($('name')) {
      $('name').activate();
    }
  },
  save_values: function() {
    var theForm = $(this.formName);
    var fieldNames = $H(this.node.options.fields).keys();
    theForm.getInputs('text').each(function (fe) {
      this.node.options.fields[fe.name] = fe.value;
    }.bind(this));
    debug("set color "+ this.selected_color);
    if (this.node.options.fields.color) {
      this.node.options.fields.color = this.selected_color;
    }
    this.node.has_sub = $F('has_sub')
    this.node.updateFields();
  },
  deselect: function() {
    $$('.selected').each( function(elem) {
       elem.removeClassName('selected');
     });
  },

  show: function(node) {
    if(this.form_observer !=null) {
      this.form_observer.stop();
      this.form_observer = null;
      $('palette').stopObserving('click');
    }

    if (this.node) {
      if ($(this.node.bodyEl)) {
        $(this.node.bodyEl).removeClassName('selected');
      }
      if (this.node.options.selected) {
        this.node.options.selected=false;
        this.node.redraw();
      }
    }
    this.node = node;
    this.updateFields();

    this.selected_color = this.node.options.fields.color || "color2";
    var selected_pallete_item = $(this.selected_color);
    if (selected_pallete_item) {
      this.deselect();
      $(selected_pallete_item).addClassName('selected');
    }

    this.form_observer = new Form.Observer($(this.formName),0.3,this.save_values.bind(this));
    $('prop_form').show();
    if (this.node.options.fields.color) {
      $('palette').show();
      $('palette').observe('click', function (event) {
        this.deselect();
        var element = event.element();
        element.addClassName('selected');
        this.selected_color = element.identify();
        this.save_values();
      }.bind(this));
      this.node.options.selected=true;
    }
    else {
      $('palette').hide();
      $(this.node.bodyEl).addClassName('selected');
    }
    if (this.node.options.icon) {
      if($('icon_spot')) {
        $('icon_spot').update('<img src="' + this.node.options.icon + '" alt="icon" class="icon"/></br>');
      }
    }
    else {
      if($('icon_spot')) {
        $('icon_spot').update('');
      }
    }
  }

}












function debug(message) {
  if (console && console.log) {
    console.log(message);
  }
}

WireIt.Layer.prototype.setOptions = function(options) {
  var defaults = {
    className: 'WireIt-Layer',
    parentEl: document.body,
    containers: [],
    wires: [],
    layerMap: false,
    enableMouseEvents: true
  }
  defaults = $H(defaults);
  this.options = defaults.merge($H(options)).toObject();
  debug("loaded defaults for wire-it layer");
  debug(this.options.parentEl);
};
/**
 * WireLabel class used by the "mySystem" module
 * @class Container
 * @namespace mySystem
 * @constructor
 */
MySystemWireLabel = function(options, layer) {
    MySystemWireLabel.superclass.constructor.call(this, options, layer);
    this.buildTextArea(options.codeText || "Label me!");
};

YAHOO.extend(MySystemWireLabel, WireIt.Container, {
    /**
    * Create the textarea for the javascript code
    * @method buildTextArea
    * @param {String} codeText
    */
    buildTextArea: function(codeText) {
        this.textarea = WireIt.cn('textarea', null, {
            width: "70%",
            height: "20px",
            border: "0",
            padding: "5px"
        },
        codeText);
        this.setBody(this.textarea);
        YAHOO.util.Event.addListener(this.textarea, 'change', this.createTerminals, this, true);
    },

    /**
    * Extend the getConfig to add the "codeText" property
    * @method getConfig
    */
    getConfig: function() {
        var obj = MySystemWireLabel.superclass.getConfig.call(this);
        obj.codeText = this.textarea.value;
        return obj;
    }

});

(function() {
  VLEDSService = function(_vle){
    this.data = "";
    this.vle = _vle
  };

  VLEDSService.prototype = {
    save: function(_data) {
        this.vle.saveHtmlState(_data);
        this.data = _data;
    },

    load: function(context,callback) {
      this.data = this.vle.getLatestHtmlState();
      callback(this.data,context);
    },

    toString: function() {
      return "VLE Data Service (" + this.vle + ")";
    }
  };

})();
/*

uuid.js - Version 0.3
JavaScript Class to create a UUID like identifier

Copyright (C) 2006-2008, Erik Giberti (AF-Design), All rights reserved.

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 2 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to the Free Software Foundation, Inc., 59 Temple
Place, Suite 330, Boston, MA 02111-1307 USA

The latest version of this file can be downloaded from
http://www.af-design.com/resources/javascript_uuid.php

HISTORY:
6/5/06 	- Initial Release
5/22/08 - Updated code to run faster, removed randrange(min,max) in favor of
          a simpler rand(max) function. Reduced overhead by using getTime()
          method of date class (suggestion by James Hall).
9/5/08	- Fixed a bug with rand(max) and additional efficiencies pointed out
	  by Robert Kieffer http://broofa.com/

KNOWN ISSUES:
- Still no way to get MAC address in JavaScript
- Research into other versions of UUID show promising possibilities
  (more research needed)
- Documentation needs improvement

*/

function UUID(){
	this.id = this.createUUID();
}

UUID.prototype.valueOf = function(){ return this.id; }
UUID.prototype.toString = function(){ return this.id; }


UUID.prototype.createUUID = function(){
	var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
	var dc = new Date();
	var t = dc.getTime() - dg.getTime();
	var h = '-';
	var tl = UUID.getIntegerBits(t,0,31);
	var tm = UUID.getIntegerBits(t,32,47);
	var thv = UUID.getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
	var csar = UUID.getIntegerBits(UUID.rand(4095),0,7);
	var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);

	var n = UUID.getIntegerBits(UUID.rand(8191),0,7) +
			UUID.getIntegerBits(UUID.rand(8191),8,15) +
			UUID.getIntegerBits(UUID.rand(8191),0,7) +
			UUID.getIntegerBits(UUID.rand(8191),8,15) +
			UUID.getIntegerBits(UUID.rand(8191),0,15); // this last number is two octets long
	return tl + h + tm + h + thv + h + csar + csl + h + n;
}




UUID.getIntegerBits = function(val,start,end){
	var base16 = UUID.returnBase(val,16);
	var quadArray = new Array();
	var quadString = '';
	var i = 0;
	for(i=0;i<base16.length;i++){
		quadArray.push(base16.substring(i,i+1));
	}
	for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
		if(!quadArray[i] || quadArray[i] == '') quadString += '0';
		else quadString += quadArray[i];
	}
	return quadString;
}

UUID.returnBase = function(number, base){
	return (number).toString(base).toUpperCase();
}

UUID.rand = function(max){
	return Math.floor(Math.random() * (max + 1));
}


// TODO This is for debugging. REMOVE it later.

(function() {
    
    var util = YAHOO.util;
    var lang = YAHOO.lang;
    var Event = util.Event;
    var Dom = util.Dom;
    var Connect = util.Connect;
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
        // Init the DDProxy
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

            // The layer is the only target :
            var layerTarget = ddTargets[0];
            var layer = ddTargets[0]._layer;
            var del = this.getDragEl();
            var pos = YAHOO.util.Dom.getXY(del);
            var layerPos = YAHOO.util.Dom.getXY(layer.el);
            var i = 0;
            
            pos[0] = pos[0] - layerPos[0];
            pos[1] = pos[1] - layerPos[1];
            
            
            /*var Copy = new Object;
            for( var i in this._module ){
              Copy[ i ] = this._module[ i ];
            }
            Copy.engineNode = newEngineNode;
            */

            var Copy = function (par) {
              for (i in par._module) {
                this[ i ] = par._module[ i ];
              }
              this.fields = {};
              for(i in par._module.fields) {
                this.fields[i] = par._module.fields[ i ];
              }
              debug(this);
              var energyForm = {};
              energyForm[ par._module.fields.form ] = par._module.fields.efficiency;            

              this.engineNode = my.newNode({
                  name        : par._module.name,
                  module      : par._module,
                  type        : par._module.etype,
                  output      : [],
                  energy      : par._module.fields.energy || 0,
                  inputRate   : par._module.fields.inputRate,
                  efficiency  : energyForm // reference energies object
              });
            };

            this._MySysEditor.addModule(new Copy(this), pos );
        }
    });

/**
 * The MySystemEditor class provides a full page interface 
 * @class WiringEditor
 * @constructor
 * @param {Object} options
 */
    MySystemEditor = function(data) {
        // set the default options
        this.setOptions(data);
        this._data = data;
        this.numLayers = 1;
        this.propEditor = new MySystemPropEditor({});
        
        // Flag for auto-save to determine if anything important has
        // changed since last save
        this.dirty = false;
        
        //window.setInterval(this.autoSave, 60 * 1000);
        
        /**
       * @property layout
       * @type {YAHOO.widget.Layout}
       */
        this.layout = new widget.Layout(null, this.options.layoutOptions);
        this.layout.render();
        
        // Render module list
        this.buildModulesList();

        // Render buttons
        // this.enableLoadAndSave();
        this.renderButtons();

        this.goalPanel = new GoalPanel($('#goal_panel'), $('#goal_panel_icon'));
        this.goalPanel.render();
    };

    MySystemEditor.prototype = {
        /**
        * @method setOptions
        * @param {Object} options
        */
        setOptions: function(options) {
            // Unload any older options:
            this.options = {};
            // Load the modules from options
            
            this.modules = options.modules || ([]);
            
            /* modulesByName doesn't seem to be used at all.
             * Besides, m.name is only defined for notes, not containers
            this.modulesByName = {};
            for (var i = 0; i < this.modules.length; i++) {
                var m = this.modules[i];
                this.modulesByName[m.name] = m;
            }
            */

            this.options.languageName = options.languageName || 'anonymousLanguage';
            this.options.smdUrl = options.smdUrl || 'WiringEditor.smd'; // eh?
            
            // FIXME: This url should be determined by whatever outside authoring system is wrapping the editor
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
                    width: 120,
                    resize: true,
                    body: 'left',
                    gutter: '5px',
                    collapse: true,
                    collapseSize: 25,
                    header: 'Objects:',
                    scroll: true,
                    animate: true
                },
                {
                  position: 'right'
                },
                {
                    position: 'center',
                    body: 'center',
                    gutter: '5px'
                }
                ]
            };
            
            // LAYER OPTION DEFAULTS:
            this.options.layerOptions = {};
            var layerOptions = options.layerOptions || {};
            this.options.layerOptions.parentEl = layerOptions.parentEl ? layerOptions.parentEl: Dom.get('center');
            // this.options.layerOptions.layerMap = YAHOO.lang.isUndefined(layerOptions.layerMap) ? true: layerOptions.layerMap;
            this.options.layerOptions.layerMap = false;
            // this.options.layerOptions.layerMapOptions = false;
            // this.options.layerOptions.layerMapOptions = layerOptions.layerMapOptions || { parentEl: 'layerMap' };
            
            MySystemContainer.openPropEditorFor.subscribe(this.onOpenPropEditorFor,this,true);
            MySystemContainer.openContextFor.subscribe(this.onOpenContextFor,this,true);
            WireIt.Wire.openPropEditorFor.subscribe(this.onOpenPropEditorFor,this,true);
            // create new layer-map.
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
            // this.layer = null;
          }
          
          if (this.rootLayer) {
            this.removeLayer(this.rootLayer);
            // this.rootLayer = null;
          }
          this.numLayers = 0;
          this.layerStack = [];
          this.rootLayer = this.addLayer();
          this.changeLayer(this.rootLayer);
         },
         
        /**
        * Open the properties editor for this container
        *
        **/
        onOpenPropEditorFor: function(type,args) {
          module = args[0];
          this.propEditor.show(module);
        },
        
        /**
        * Open a new layer for this container
        *
        **/
        onOpenContextFor: function(type,args) {
            module = args[0];
            if (module.has_sub) {
              if (module.subSystem === null) {
                module.subSystem = this.addLayer();
              }
              // this.changeLayer(module.subSystem);
            }
        },
        addLayer: function() {
            this.numLayers = this.numLayers + 1;
            var newOpts = {};
            for (var key in this.options.layerOptions) {
              newOpts[key] = this.options.layerOptions[key];
            }
            newOpts.layerNumber = this.numLayers;
            var newLayer = new WireIt.Layer(newOpts);
            // this.addLayerMap(newLayer);
            return newLayer;
          },
        removeLayer: function(newLayer) {
          this.numLayers = this.numLayers - 1;
          // this.removeLayerMap(newLayer);
          newLayer.removeAllContainers();
          newLayer=null;
          return null;
        },
        changeLayer: function(newLayer) {
             var index = this.layerStack.indexOf(newLayer);
             if (index < 0) {
               // this.addLayerMap(newLayer);
               debug('FIXME what do we really want to do here?');
             }
             // otherwise we remove all the layers under this one (search the tree?)
             else {
               // for(var i = index+1; i < this.layerStack.size();i++) {
               //   this.removeLayerMap(this.layerStack[i]);
               // }              
               // after we have deleted things, we compact it:
               this.layerStack = this.layerStack.compact();
             }
             this.setLayer(newLayer);
             // this.updateLayerInfo();
        },
        setLayer:function(newLayer) {
          // kind of a hack, clean any bad wiring from the layer before we continue:
          this.cleanWiring(newLayer);
          if (!this.layer) { this.layer = this.rootLayer;}
          var parentDom = this.layer.options.parentEl;
          parentDom.replaceChild(newLayer.el,this.layer.el);
          $(this.layer.el).hide();
         
          //this.layer.el.update(this.layer.options.layerNumber);//whats that going to do?
          this.layer = newLayer;
          $(this.layer.el).show();
          this.setDDLayer(this.layer);
          this.hidePropEditor();
       },
        // 
        // removeLayerMap: function(newLayer) {
        //   try {
        //     Event.removeListener(newLayer.layerMap.element, 'mouseup');
        //     newLayer.layerMap.options.parentEl.removeChild(newLayer.layerMap.element);
        //     if (this.layerStack.indexOf(newLayer)) {
        //       this.layerStack[this.layerStack.indexOf(newLayer)]= null;
        //     }
        //   }
        //   catch (e) {
        //     debug("error removing layer Map: " + e);
        //   }
        // },
        // 
        // 
        // addLayerMap: function(newLayer) {
        //   this.layerStack.push(newLayer);
        //   newLayer.layerMap.options.parentEl.appendChild(newLayer.layerMap.element);
        //   // add listener to layer.layerMap                    
        //   Event.addListener(newLayer.layerMap.element, 'mouseup', function (e,args) {
        //      Event.stopEvent(e);
        //      this.changeLayer(newLayer);
        //   }, this, true);
        // },
        // 
        // 
        // 
        // 
        // updateLayerInfo: function() {
        //   // var layerInfo = "<h3>current layer: " + this.layer.options.layerNumber +"</h3><ul>layer stack:";
        //   // $A(this.layerStack).each( function(layer){
        //   //   layerInfo += "<li>" + layer.options.layerNumber + "</li>";
        //   // });
        //   // layerInfo += "</li>";
        //   // $('layer_info').update(layerInfo);
        // },
        // 
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
            // WireIt.compact(newLayer.wires);
            newLayer.wires = newLayer.wires.compact();
            debug("array size post: " + newLayer.wires.length);
          }
        },
        

        hidePropEditor: function() {
          $('#property_editor').hide();
        },
        
        /**
        *
        *
        **/
        setDDLayer: function(theLayer) {
            this.ddTarget = new YAHOO.util.DDTarget(this.layer.el, "module");
            this.ddTarget._layer = this.layer;
        },
        
        addModuleChoice: function(module) {           
          
            var left = Dom.get('left');
            var div = WireIt.cn('div', {
                className: "WiringEditor-module"
            });

            if (module.image) {
                div = WireIt.cn('div', {
                    className: "WiringEditor-icon-module"
                });
                div.appendChild(WireIt.cn('img', {
                    src: module.image
                }));
            } else {
                div = WireIt.cn('div', {
                    className: "WiringEditor-module"
                });
                div.appendChild(WireIt.cn('span', null, null, module.name));
            }

            if (module.fields && module.fields.name) {
              div.appendChild(WireIt.cn('span', null, null, module.fields.name));
            }
            else if (module.name) {
              div.appendChild(WireIt.cn('span', null, null, module.name));
            }
            var ddProxy = new MySystemDragAndDropProxy(div, this);
            ddProxy._module = module;
            left.appendChild(div);

            // Make the layer a drag drop target
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
        * usually invoked by drag-and-drop callback
        */
        addModule: function(module, pos){
              module.position = pos;
              module.title = module.name;
              module.layer = this.layer;
              var container = this.layer.addContainer(module);
              container.setTitle(module.title);
              container.options.position = pos;
              container.module = module;
              Dom.addClass(container.el, "WiringEditor-module-" + module.name);
        },


        /**
        * Toolbar
        * @method renderButtons
        */
        renderButtons: function() {
            var toolbar = Dom.get('toolbar');
            // Buttons :
            var newButton = new widget.Button({
                label: "Clear Diagram",
                id: "WiringEditor-newButton",
                container: toolbar
            });
            newButton.on("click", this.onNew, this, true);


            //
            // We do not use a help button anymore.
            // 
            // var helpButton = new widget.Button({
            //     label: "help",
            //     id: "WiringEditor-helpButton",
            //     container: toolbar
            // });
            // helpButton.on("click", this.onHelp, this, true);
        },
        /**
        * Enable the save and load buttons
        * @method enableLoadAndSave
        */
        enableLoadAndSave: function() {
          var toolbar = Dom.get('toolbar');
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
        },
        
        /**
        * Enable the print button
        * @method enablePrint
        */
        enablePrint: function() {
          var toolbar = Dom.get('toolbar');
          var printButton = new widget.Button(
            {
              label: "Print",
              id: "MySystem Print button",
              container: toolbar
            });
            printButton.on("click", this.onPrint, this, true);
        },
        
        /**
        * Enable the button to "Show Jason Data"
        * @method enableShowJason
        */
        enableShowJason: function() {
          var toolbar = Dom.get('toolbar');
          var jsonDataButton = new widget.Button({
              label: "show json data",
              id: "MySystem Json data button",
              container: toolbar
          });
          jsonDataButton.on("click", this.onShowJson, this, true);
        },
        
        /**
        * @method onSave
        */
        onSave: function() {
         if (this.dataService) {
           debug("calling save " + this.dataService);
           debug('json:' + JSON.stringify([this.rootLayer.getWiring()]));
           this.dataService.save(JSON.stringify([this.rootLayer.getWiring()]));
           debug("save has returned... ");
         }
         else {
           alert("No Data Service defined");
         }
        },

        /**
         * @method onLoad
         */

         onLoad: function() {
           var self = this;
           if (self.dataService) {
             self.dataService.load(self, self.loadCallback);
           }
           else {
             alert("No Data Service defined");
           }
         },
         
        loadCallback: function(rsp, context) {
          debug("json-loading:\n===================================\n" + rsp);
             
          try {
            var obj = (typeof rsp === 'object') ? rsp : JSON.parse(rsp);

            if (obj && obj.length > 0) {
              //alert('Loaded: ' + JSON.stringify(obj));
              context.resetLayers();
              context.rootLayer.setWiring(obj[0]);
            }
          }
          catch (e) {
            if (e instanceof SyntaxError) {
              alert('JSON parse error');
            }
            else {
              alert('Unknown error in MySystemEditor#loadCallback');
            }
          }
        },

        /**
        * @method onPrint
        */
        onPrint: function() {
          this.onSave();
          window.open('print.html');
        },
         
        /**
         * @method onPrint
         */
        // onShowJson: function(layer_object) {
        //     var width = this.rootLayer.el.getWidth();
        //     var height = this.rootLayer.el.getHeight();
        // 
        // 
        //     $('JSON_DATA').update(
        //       "<p><br><ul><li>width: " + width + 
        //       "<li> height: " + height +
        //      "</ul></p><code>" + [this.rootLayer.getWiring()].toJSON() + "</code>");
        //     this.devPanel.render();
        //     this.devPanel.show();
        // 
        //   },
        //  
        //  
        // /**
        // * Create a help panel
        // * @method onHelp
        // */
        // onHelp: function() {
        //     this.helpPanel.show();
        // },

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

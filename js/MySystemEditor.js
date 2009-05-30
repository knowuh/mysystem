// TODO This is for debugging. REMOVE it later.
var glayer = { name: "foo" };

(function() {
    var util = YAHOO.util;
    var lang = YAHOO.lang;
    var Event = util.Event;
    var Dom = util.Dom;
    var Connect = util.Connect;
    var JSON = lang.JSON;
    var widget = YAHOO.widget;

    /**
   * Module Proxy handle the drag/dropping from the module list to the layer
   * @class ModuleProxy
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
            pos[0] = pos[0] - layerPos[0];
            pos[1] = pos[1] - layerPos[1];
            this._MySysEditor.addModule(this._module, pos);
            this._MySysEditor._data.addInstance({module: this._module, position: pos});
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

        /**
       * @property layer
       * @type {WireIt.Layer}
       */
        this.layerStack = [];
        this.rootLayer = new WireIt.Layer(this.options.layerOptions);
        this.changeLayer(this.rootLayer);
        
        // Render module list
        this.buildModulesList();

        // Render buttons
        this.renderButtons();

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
            this.modulesByName = {};
            for (var i = 0; i < this.modules.length; i++) {
                var m = this.modules[i];
                this.modulesByName[m.name] = m;
            }

            this.options.languageName = options.languageName || 'anonymousLanguage';
            this.options.smdUrl = options.smdUrl || 'WiringEditor.smd'; // eh?
            
            // FIXME: This url should be determined by whatever outside authoring system is wrapping the editor
            this.options.dataUrl = "http://mysystem.local/webdav/msystem.txt";
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
            
            // LAYER OPTION DEFAULTS:
            this.options.layerOptions = {};
            var layerOptions = options.layerOptions || {};
            this.options.layerOptions.parentEl = layerOptions.parentEl ? layerOptions.parentEl: Dom.get('center');
            this.options.layerOptions.layerMap = YAHOO.lang.isUndefined(layerOptions.layerMap) ? true: layerOptions.layerMap;
            this.options.layerOptions.layerMapOptions = layerOptions.layerMapOptions || { parentEl: 'layerMap' };
            MySystemContainer.openEditorFor.subscribe(this.onOpenEditorFor,this,true);
        },

        /**
        *
        *
        **/
        onOpenEditorFor: function(type,args) {
            module = args[0];
            if (module.subSystem == null) {
              module.subSystem = new WireIt.Layer(this.rootLayer.options);
            }
            this.changeLayer(module.subSystem);
        },
        
        
        removeLayerMap: function(newLayer) {
          console.log("removing layerMap " + newLayer);
          try {
            // remove listener on layerMap element
            Event.removeListener(newLayer.layerMap.element, 'mouseup');
            // remove the layers layerMap from the dom:
            newLayer.layerMap.options.parentEl.removeChild(newLayer.layerMap.element);
          }
          catch (e) {
            console.log("error removing layer: " + e);
          }
        },
        
        
        addLayerMap: function(newLayer) {
          console.log("creating layerMap " + newLayer);
          this.layerStack.push(newLayer);
          // add listener to layer.layerMap
          Event.addListener(newLayer.layerMap.element, 'mouseup', function (e,args) {
             Event.stopEvent(e);
             this.changeLayer(newLayer);
          }, this, true);
        },
        
        
        changeLayer: function(newLayer) {
          
          // if this layer is 'new' we just push it.
          // and add event listeners.
          var index = this.layerStack.indexOf(newLayer);
          if(index < 0) {
            this.addLayerMap(newLayer);
          }
          // otherwise we remove all the layers under this one (search the tree?)
          else {
            console.log('trying to remove some layers');
            var l = null;
            for(var i = index+1; i < this.layerStack.size();i++) {
              l = this.layerStack[i];
              this.layerStack[i] = null;
              this.removeLayerMap(l);
            }
            // get rid of null elements:
            this.layerStack = this.layerStack.compact();
          }
          this.setLayer(newLayer)
        },
        
        setLayer:function(newLayer) {
          var lastLayer = this.layer || this.rootLayer;
          var parentDom = lastLayer.options.parentEl;
          this.layer = newLayer;
          lastLayer.el.hide();
          this.layer.el.show();
          parentDom.replaceChild(this.layer.el,lastLayer.el);
          this.setDDLayer(newLayer);   
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
            console.log("found name: " + module.name);
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
                console.log("created icon module");
            } else {
                var div = WireIt.cn('div', {
                    className: "WiringEditor-module"
                });
                div.appendChild(WireIt.cn('span', null, null, module.name));
                console.log("created WiringEditor module");
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
        * usually invoked by drag-and-drop callbac
        */
        addModule: function(module, pos) {
            try {
                //var containerConfig = module.container;
                console.log("addModule called for " + module.name);
                module.position = pos;
                module.title = module.name;
                module.layer = this.layer;
                var container = this.layer.addContainer(module);
                Dom.addClass(container.el, "WiringEditor-module-" + module.name);
            }
            catch(ex) {
                console.log("Error Layer.addContainer", ex.message);
            }
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
        	console.log("Save clicked");
            this.save();
        },

        /**
        * save the layer data
        * @method save
        * TODO: Actually save something!
        */
        save: function() {
        	console.log([this.layer.getWiring()].toJSON());

        	var xmlhttp = HTTP.newRequest();
        	xmlhttp.open('PUT', this.options.dataUrl, false);
        	xmlhttp.send([this.layer.getWiring()].toJSON());
        	
//        	callback = { 
//              	  success: function(o) { alert("Successful save!"); }, 
//                    failure: function(o) { alert("Successful save!"); },
//                    scope: this
//                  };
        	alert("Response: " + xmlhttp.responseText);
        	// YAHOO.util.Connect.asyncRequest('POST', this.options.dataUrl, callback, [this.layer.getWiring()].toJSON() )
        },
        
        /**
         * @method onSave
         */
         onLoad: function() {
         	console.log("Load clicked");
             this.load();
         },
         
         load: function() {
        	 console.log("loading...");
         	callback = function(text) {
	         	obj = eval(text);
	         	console.log("got object: " + obj[0].containers[0]);
	         	glayer.setWiring(obj[0]);
	         	console.log("done loading.");
         	};
         	HTTP.getText(this.options.dataUrl, callback);
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
                this.propertiesForm.clear();
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

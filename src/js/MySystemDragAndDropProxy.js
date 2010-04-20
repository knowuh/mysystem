(function () {
    /**
     * Proxy to handle the drag/dropping from the module list to the layer
     * @class MySystemDragAndDropProxy
     * @constructor
     * @param {HTMLElement} el
     * @param {MySystemEditor} WiringEditor
     */
    var MySystemDragAndDropProxy = function(el, MySysEditor) {
        this._MySysEditor = MySysEditor;
        // Init the DDProxy
        MySystemDragAndDropProxy.superclass.constructor.call(this, el, "module", {
            dragElId: "moduleProxy"
        });
        this.isTarget = false;
    };

    mysystem.MySystemDragAndDropProxy = MySystemDragAndDropProxy;

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
    
})();

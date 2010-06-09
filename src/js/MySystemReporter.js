(function () {

    mysystem.MySystemReporter = function (editor) {
        this.wiring = editor.rootLayer.getWiring();
    };
    
    mysystem.MySystemReporter.prototype = {
        
        getCSV: function () {
            var i;
            var sep = ',';
            var t = 'Containers:\n' + 'ID' + sep + 'Name\n';
            var node;
            for (i = 0; i < this.wiring.containers.length; ++i) {
                t += i + sep + this.wiring.containers[i].name + '\n';
            }
            t += '\nWires:\n' +
                ['ID', 'Name', 'Source', 'Target'].join(sep) + '\n';
            for (i = 0; i < this.wiring.wires.length; ++i) {
                node = this.wiring.wires[i];
                t += [i, node.options.fields.name, node.src.moduleId, node.tgt.moduleId].join(sep) + '\n';
            }
            return t;
        }
    };
    
})();

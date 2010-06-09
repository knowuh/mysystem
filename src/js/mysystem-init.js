(function () {
    // Create a name space for MySystem
    if (typeof mysystem === 'undefined' || !console) {
        this.mysystem = {};
    }
    else {
        var msg = 'Error: mysystem needs to be a unique globally\n';
        msg += 'to function as a namespace';
        alert(msg);
        return;
    }
    
    if (!mysystem.config) {
        this.mysystem.config = {};
    }
    
    // In case console.log() is not defined
    if (typeof console === 'undefined' || !console) {
        this.console = {};
    }
    if (!console.log) {
        console.log = function() {};
    }
    if (typeof debug === 'undefined' || !debug) {
        this.debug = console.log;
    }
    
    this.mysystem.loadMySystem = function () {
        if (!mysystem.config.dataService) {
            alert('Error: data service is undefined');
            return null;
        }
        if (!mysystem.config.jsonURL) {
            alert('Error: jsonURL is undefined');
            return null;
        }
        
        var mySystem = new mysystem.MySystem(mysystem.config.jsonURL);
        mysystem.mySystem = mySystem;
        mySystem.setDataService(mysystem.config.dataService);
        
        if (mySystem.editor) {
            if (mysystem.config.enableLoadAndSave) {
                mySystem.editor.enableLoadAndSave();
            }
        }
        
        mySystem.load();
        return mySystem;
    };
    
})();


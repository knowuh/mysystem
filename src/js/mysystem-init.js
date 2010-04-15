(function() {
    // Create a name space for MySystem
    if (typeof mysystem === 'undefined' || !mysystem) {
        this.mysystem = {};
    }
    
    // In case console.log() is not defined
    if (typeof console === 'undefined' || !console) {
        this.console = {};
    }
    if (!console.log) {
        console.log = function() {};
    }
    this.debug = console.log;
    
    $(document).ready(function() {
        if (!mysystem.dataService) {
            alert('Data service is undefined');
            return;
        }

        var mySystem = new mysystem.MySystem('prefs.json');
        mySystem.setDataService(mysystem.dataService);
        if (mySystem.editor) {
            mySystem.editor.enableLoadAndSave();
        }
        mySystem.load();
        
        $(window).unload(function() {});

        var onExit = function () {
            debug("saving mystem data before we leave");
            mySystem.save();
            debug("saved!");
        };
        //window.onbeforeunload = onExit;
    });
    
})();


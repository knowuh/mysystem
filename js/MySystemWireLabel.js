/**
 * WireLabel class used by the "mySystem" module 
 * @class Container
 * @namespace mySystem
 * @constructor
 */
MySystemWireLabel = function(options, layer) {
    MySystemWireLabel.superclass.constructor.call(this, options, layer);
    this.buildTextArea(options.codeText || "Label me!");
    /**this.buildTextArea(options.codeText || "Label Me!"); **/
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


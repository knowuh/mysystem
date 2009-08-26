(function(){
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

  MySystem = function(){
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
    * Tell the editor to load data from the dataService.
    * @method load
    */
    load: function() {
      this.editor.onLoad();
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
})();
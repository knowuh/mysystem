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


var MySystemDemo = {
  data : new MySystemData(),
  /**
  * @method init
  * @static
  */
  init: function() {
      try {  
        this.data.setData(testData,[],true);
        this.editor = new MySystemEditor(this.data);
        // this.editor.onHelp();
      }
      catch (e){
        // debug("ooopps! " + e)
      }
  },

  init_author: function(read_key,write_key) {
    this.init();
    return this.setKeys(read_key,write_key);
  },
  
  init_learner: function(read_key,write_key) {
    this.init();
    return this.setKeys(read_key,write_key);
  },

  setKeys: function(read,write) {
    if (read) {
      this.editor.options.modelId = read
      this.editor.load(read);
    }
    
    if (write) {}
    // generate a new write-key if we don't have on
    else {
      write = new UUID().toString();
    }
    // set the write-key
    this.editor.options.modelId = write;
    return write;
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
};

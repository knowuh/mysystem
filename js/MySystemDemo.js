var testData = [
	{
		'name'				: 'sun',
    'image'				: "./images/sun.png",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/sun.png",
    'fields'			: {
    									'energy': 888,
    									'efficiency'	: { 'light': 1 },
											'output'			: [ 'space', 'earth' ],
											'type'				: 'source'
    								}
	},
	{
		'name'				: 'space',
		'type'				: 'void',
    'image'				: "./images/space.jpg",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/space.jpg"
	},
	{
		'name'				: 'earth',
		'type'				: 'planet',
		'inputRate'		: .5,
		'efficiency'	: { light: .2 },
		'output'			: [ 'grass1', 'grass2' ],
    'image'				: "./images/world.png",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/world.png"
	},
	{
		'name'				: 'grass',
		'type'				: 'primary producer',
		'inputRate'		: .15,
		'efficiency'	: { chemical: .1 },
		'output'			: [ 'bugs-fungi' ],
    'image'				: "./images/grass.jpg",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/grass.jpg"
	},
	{
		'name'				: 'bugs-fungi',
		'type'				: 'decomposer',
		'inputRate'		: .1,
		'efficiency'	: { chemical: .1 },
		'output'			: [ 'grass1' ],
    'image'				: "./images/bugs.jpg",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/bugs.jpg"
	},
	{
		'name'				: 'rabbit',
		'type'				: 'primary consumer',
		'inputRate'		: .2,
		'efficiency'	: { chemical: .15 },
		'output'			: [ 'owl', 'bugs-fungi' ],
    'image'				: "./images/rabbit.jpg",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/rabbit.jpg"
	},
	{
		'name'				: 'owl',
		'type'				: 'secondary consumer',
		'inputRate'		: .2,
		'efficiency'	: { chemical: .15 },
		'output'			: [ 'fox', 'bugs-fungi' ],
    'image'				: "./images/owl.jpg",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/owl.jpg"
	},
	{
		'name'				: 'fox',
		'type'				: 'predator',
		'inputRate'		: .18,
		'efficiency'	: { chemical: .1 },
		'output'			: [ 'bugs-fungi' ],
    'image'				: "./images/fox.jpg",
    'xtype'				: "MySystemContainer",
    'icon'				: "./images/fox.jpg"
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

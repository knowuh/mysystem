/* 	mySystem 	- Engine Model 0.1
		License 	- Copyright Concord Constortium © 2009
		Developer - Alistair MacDonald, Hyper-Metrix.com */

(function(){

	var MyObject = function( len ){
		this.id =  len + new Date().getTime().toString();
		this.position = { x: 0, y: 0 };
		return this;
	};

	MyObject.prototype.set = function( args ){
		for( var i in args ){
			this[ i ] = args[ i ];
		}
		return this;
	};
	
	MyObject.prototype.get = function(){
		var props = {};
		var len = arguments.length;
		for( var i = 0; i < len; i++ ){
			var prop = arguments[ i ];
			props[ prop ] = this[ prop ];
		}
	};
		
	MyObject.prototype.kill = function(){}

	// Node prototype ////////////////////////////////////////////////////////////
	var Node = function(){};
	Node.prototype						= new MyObject;
	Node.prototype.name 			= 'un-named';
	Node.prototype.type 			= 'void';
	Node.prototype.energy 		= 0;
	Node.prototype.heatLoss		= 0;		
	Node.prototype.cycles 		= 0;
	Node.prototype.inputRate 	= 1;
	Node.prototype.output 		= [];
	// todo: remove what is not needed above when done
	
	Node.prototype.transform = function(){
		this.cycles ++;
		
		// calculate node's transfer efficiency
		var sumEfficient = 0;
		for( var i in this.efficiency ){
			sumEfficient += this.efficiency[ i ];
		}
		var sumLoss = 1 - sumEfficient;
		
		// todo: calculation for potential energy
		
		// calculate childrens energy ratio
		var sumInputRate = 0;
		var len = this.output.length;
		for( var i = 0; i < len; i++ ){
			var iNode = my.node( this.output[ i ] );
			sumInputRate += iNode.inputRate;
		}
		var ratio = 1 / sumInputRate;
		
		
				
		// push energy to children
		for( var i = 0; i < len; i++ ){
			var iNode = my.node( this.output[ i ] );
			var energyTransfer = ( this.energy * iNode.inputRate * ratio ) * sumEfficient;
			
			iNode.energy += energyTransfer;
			
			iNode.cycles < my.cycles ? iNode.transform() : 0 ;
		}
		
		this.heatLoss += this.energy * sumLoss || this.energy;
		if( this.type != 'source' ){			
			this.energy -=  this.energy * ( sumEfficient + sumLoss );
		}				
			
	}

	// System constructor ////////////////////////////////////////////////////////
	var System = function(){

		this.defaults = {
			entropy	: .987654321,
			arrows	: {
									width: { max: 30, min: .5 }
								},
			nodes		: {
								},
			AJAX		:	{ method: 'GET', async: true }
		};

		this.nodes 	= [];
		this.arrows = [];

		// CYCLE: 1 turn or cycle of the engine ....................................
		this.cycles = 0;
		this.cycle = function(){
			this.cycles ++;
			var sources = this.nodesWith( { type: 'source' } );
			var len = sources.length;
			for( var i = 0; i < len; i++ ){
					sources[ i ].transform();
			}
			console.log('-> cycled <-');
		}

		this.newNode = function( props ){
			var len = this.nodes.length;
			return this.nodes[ len ] =  ( new Node )
					.constructor( 'n' + len + '_' )
					.set( props );
		}
		
		this.loadNodes = function( file ){
			JSON = eval( this.AJAX.get( file ).responseText );
			for( var i in JSON ){
				this.newNode( JSON[ i ] );
			}
		},

		this.list = function(){
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var n = this.nodes[ i ]
				console.log([ n.name, n.type, n.heatLoss ]);
			}
		},


		this.nodesWith = function( props ){
			var collection = [];
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var iNode = this.nodes[ i ];
				for( var j in props ){
					if( iNode[ j ] == props[ j ] ){
						collection[ collection.length ] = iNode;
					};				
				}
			}
			return collection;
		},

		// Returns a node by a) it's ID, b) it's Name (return array?), c) it's Index
		this.node = function( id_or_name ){
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var iNode = this.nodes[ i ];					
				if( id_or_name == iNode.id || id_or_name == iNode.name ){
					return iNode;
				}
			}
			return false;
		}		
		
		//-- AJAX ----------------------------------------------------------------//
		this.AJAX = new Object();
		this.AJAX = {
			
			responseText: '',
			
			// GET requests
			get: function( url, async, keyvals ){
			
				var async = ( async === 'undefined' ) ? this.defaults.AJAX.async : async ;
				
				var Get = new XMLHttpRequest;
				Get.open( 'GET', url, async );
				Get.send( keyvals || 'null' );

				if( async ){
					console.log("async", this);
					Get.onreadystatechange = function(){
						if( Get.readyState == 4 ){
							this.responseText = Get.responseText;
							return this;
						}
					}
				} else {
					this.responseText = Get.responseText;
					return this;
				}
				
			}
						
		}
		
		
	};
	
	// Create an instance of mySystem ////////////////////////////////////////////
	this.my = new System();

})();

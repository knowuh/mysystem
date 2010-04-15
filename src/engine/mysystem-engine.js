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
		
	MyObject.prototype.kill = function () {};

	// Node prototype ////////////////////////////////////////////////////////////
	var Node = function(){};
	Node.prototype						= new MyObject; // Call the base Prototype for all node objects.
	Node.prototype.name 			= 'un-named';
	Node.prototype.type 			= 'void'; // Type of node. Current types: 'node', 'source'.
	Node.prototype.energy 		= 0; // The amount of energy currently in this node (will always be 0 after cycle as ebergy expires from system). To get the amount of energy the system 'has' do: energyIn - heatLoss;
	Node.prototype.ratio 			= 0; // The decimal ratio of energy comsuption in comparisson to it's siblings.
	Node.prototype.energyIn		= 0; // The amount of energy that came in on the last cycle. (Value will enclude the heat-loss going out)
	Node.prototype.heatLoss		= 0; // The amount of energy lost as cycle passed through.
	Node.prototype.cycles 		= 0; // The number of cycles this node has undergone since the system cycle was last called. Used to stop infinite feedback.
	Node.prototype.inputRate 	= 1; // The energy input rate of this node. Also used to calculate ratio.
	Node.prototype.output 		= []; // The output array contains children of this node.
	// todo: remove what is not needed above when done
	
	Node.prototype.transform = function(){
	    var i = 0;
	    var iNode = 0;
	    
		this.cycles ++;
		
		// calculate node's transfer efficiency
		var sumEfficient = 0;
		for(i in this.efficiency ){
			sumEfficient += this.efficiency[i];
		}
		var sumLoss = 1 - sumEfficient;
		
		// todo: calculation for potential energy (retension/storrage)
		
		// calculate childrens energy ratio
		var sumInputRate = 0;
		var len = this.output.length;
		for (i = 0; i < len; i++) {
			iNode = my.node( this.output[ i ] );
			sumInputRate += iNode.inputRate;
		}
		var ratio = 1 / sumInputRate;

		// push energy to children
		var heatLoss = 0;
		for (i = 0; i < len; i++) {
			iNode = my.node( this.output[ i ] );
			var energyTransfer = ( ( this.energy * iNode.inputRate ) * iNode.inputRate * ratio ) * sumEfficient;
			
			iNode.ratio = 1 / sumInputRate * iNode.inputRate;
			iNode.energy += energyTransfer;
			iNode.energyIn += energyTransfer;
			
			heatLoss += energyTransfer;
			
			iNode.cycles < my.sourceCount + my.cycles ? iNode.transform() : 0 ;
		}
			
		// Acculmulative Heat Loss
		this.heatLoss = heatLoss;//sumLoss * this.energy;
		if( this.type != 'source' ){
			this.energy -=  this.energy * ( sumEfficient + sumLoss );
		} else {
			this.energyIn = this.energy;
		}
		
	};

	// System constructor ////////////////////////////////////////////////////////
	var System = function(){

		this.defaults = {
			entropy	: 0.987654321, // un-used thus far
			arrows	: { width : { max: 30, min: 0.25 }
								},
			nodes		: {
								},
			AJAX		:	{ method: 'GET', async: true }
		};

		this.nodes 	= [];
		this.arrows = [];

		// CYCLE: 1 turn or cycle of the engine ....................................
		this.cycles = 0;
		this.cycle = function () {
			this.cycles ++;
			var sources = this.nodesWith( { type: 'source' } );
			
			this.sourceCount = sources.length;
			
			this.sumInputEnergy = 0;
			var len = sources.length;
			this.sourceCount = len;
			for( var i = 0; i < len; i++ ){
					iSource = sources[ i ];
					iSource.transform();
					this.sumInputEnergy += parseFloat( iSource.energy );
			}
			debug('-> cycled <-');
		};

		this.newNode = function( props ){
			var len = this.nodes.length;
			return this.nodes[ len ] =  ( new Node )
					.constructor( 'n' + len + '_' )
					.set( props );
		};
		
		this.loadNodes = function( file ){
			JSON = eval( this.AJAX.get( file ).responseText );
			for( var i in JSON ){
				this.newNode( JSON[ i ] );
			}
		};

		this.list = function(){
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var n = this.nodes[ i ];
				debug([ n.name, n.type, n.heatLoss ]);
			}
		};

		this.reset = function(){
			debug(' RESETING...  ( cycles = ' + this.cycles + ' )' );
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var n = this.nodes[ i ];
				n.energyIn = 0;
				n.heatLoss = 0;
				n.cycles = 0;				
			}
			this.cycles = 0;
			debug(' RESET: cycles = ' + this.cycles );
		};

		this.nodesWith = function( props ){
			var collection = [];
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var iNode = this.nodes[ i ];
				for (var j in props) {
					if (iNode[j] == props[j]) {
						collection[collection.length] = iNode;
					}				
				}
			}
			return collection;
		};

		// Returns a node by a) it's ID, b) it's Name (return array?), c) it's Index
		this.node = function( id_or_name ){
			var len = this.nodes.length;
			for( var i = 0; i < len; i++ ){
				var iNode = this.nodes[ i ];
				if( id_or_name == iNode.name || id_or_name == iNode.id ){				
					return iNode;
				}
			}
			return false;
		};
		
		//-- AJAX ----------------------------------------------------------------//
		this.AJAX = new Object();
		this.AJAX = {
			
			responseText: '',
			
			// GET requests
			get: function(url, async_in, keyvals) {
			    alert('AJAX.get');
				var async = (typeof async_in === 'undefined') ? this.defaults.AJAX.async : async_in;
				
				var Get = new XMLHttpRequest;
				Get.open( 'GET', url, async );
				Get.send( keyvals || 'null' );

				if (async) {
					debug("async", this);
					Get.onreadystatechange = function(){
						if( Get.readyState == 4 ){
							this.responseText = Get.responseText;
							return this;
						}
					};
				}
				else {
					this.responseText = Get.responseText;
					return this;
				}
				
			}

		};
		
	};
	
	// Create an instance of mySystem ////////////////////////////////////////////
	//this.my = new System();

})();


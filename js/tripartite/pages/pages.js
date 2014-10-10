var PAGES = {

	nodes: {},
	listeners: {},

	lastId: undefined,

	add: function ( node, id, listener ) {
		this.nodes[ id ] = node;
		this.nodes[ id ].style.display = 'none';
		this.listeners[ id ] = listener;
	},

	show: function ( id ) {

		for ( var i in this.nodes ) {
			this.nodes[ i ].style.display = 'none';
		}
		if ( this.lastId !== undefined ) {
			this.listeners[ this.lastId ]( false );
		}

		this.nodes[ id ].style.display = 'block';
		this.listeners[ id ]( true );
		this.lastId = id;

	}

};


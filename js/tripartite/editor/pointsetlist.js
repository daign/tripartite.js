EDITOR.PointSetList = function ( node, store ) {

	this.node = node;
	this.node.setAttribute( 'class', 'listNode' );

	this.store = store;
	this.entries = [];
	this.update();

};

EDITOR.PointSetList.prototype = {

	constructor: EDITOR.PointSetList,

	resize: function ( width, height ) {
		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';
	},

	update: function () {

		var self = this;

		this.store.forEach( function ( pointSet, index ) {
			if ( self.entries[ index ] === undefined ) {
				self.entries[ index ] = new EDITOR.PointSetListEntry( self.node )
			}
			self.entries[ index ].set( index );
		} );

		if ( this.store.getLength() < this.entries.length ) {
			for( var j = this.store.getLength(); j < this.entries.length; j++ ) {
				this.entries[ j ].display( false );
			}
		}

	},

	deactivateAll: function () {
		this.entries.forEach( function ( entry ) {
			entry.activate( false );
		} );
	}

};


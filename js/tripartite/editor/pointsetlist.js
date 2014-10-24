EDITOR.PointSetList = function ( node ) {

	this.node = node;
	this.node.setAttribute( 'class', 'listNode' );

	this.store = POINTS.storePermanent;
	this.entries = [];

	this.selectMode = undefined;
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

		for ( var i = 0; i < this.store.getLength(); i++ ) {
			if ( self.entries[ i ] === undefined ) {
				self.entries[ i ] = new EDITOR.PointSetListEntry( self.node )
			}
			self.entries[ i ].set( i, self.selectMode );
		}

		if ( this.store.getLength() < this.entries.length ) {
			for( var j = this.store.getLength(); j < this.entries.length; j++ ) {
				this.entries[ j ].display( false );
			}
		}

	},

	deactivateAll: function () {
		this.store.deselectAll( 'viewSelected' );
		this.entries.forEach( function ( entry ) {
			entry.activate( false );
		} );
	},

	setSelectMode: function ( m ) {
		this.selectMode = m;
		this.update();
	}

};


GEOMETRY.PointStoreTemporary = function () {

	this.entries = [];

};

GEOMETRY.PointStoreTemporary.prototype = {

	constructor: GEOMETRY.PointStoreTemporary,

	get: function ( i ) {

		if ( this.entries[ i ] === undefined ) {
			var pointSet = new GEOMETRY.PointSet();
			pointSet.generateRandom( 30 );
			this.entries[ i ] = pointSet;
		}
		return this.entries[ i ];

	},

	clear: function () {

		this.entries.forEach( function ( set ) {
			set.clear();
		} );
		this.entries = [];

	}

};


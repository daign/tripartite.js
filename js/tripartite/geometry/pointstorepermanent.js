GEOMETRY.PointStorePermanent = function () {

	this.entries = [];

};

GEOMETRY.PointStorePermanent.prototype = {

	constructor: GEOMETRY.PointStorePermanent,

	addPointSet: function ( ps ) {
		this.entries.push( { pointSet: ps, singleSelected: false, multipleSelected: false, viewSelected: false } );
	},

	deselectAll: function ( value ) {
		this.entries.forEach( function ( entry ) {
			entry[ value ] = false;
		} );
	},

	getLength: function () {
		return this.entries.length;
	},

	getNumberOfSelected: function ( value ) {
		var selected = this.entries.filter( function ( entry ) {
			return entry[ value ];
		} );
		return selected.length;
	},

	get: function ( i, value ) {
		var selected = this.entries.filter( function ( entry ) {
			return entry[ value ];
		} );
		return selected[ i ].pointSet;
	}

};


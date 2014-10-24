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
		var count = 0;
		this.entries.forEach( function ( entry ) {
			if ( entry[ value ] ) {
				count++;
			}
		} );
		return count;
	},

	get: function ( i ) {
		//TODO
		return null;
	}

};


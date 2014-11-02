GEOMETRY.PointStorePermanent = function () {

	this.entries = [];

};

GEOMETRY.PointStorePermanent.prototype = {

	constructor: GEOMETRY.PointStorePermanent,

	addPointSet: function ( ps ) {
		this.entries.push( {
			pointSet: ps,
			isValid: ps.isValid(),
			singleSelected: false,
			multipleSelected: false,
			viewSelected: false,
			update: function () {
				this.isValid = ps.isValid();
				if ( !this.isValid ) {
					this.singleSelected = false;
					this.multipleSelected = false;
				}
			}
		} );
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
			return ( entry[ value ] && entry.isValid );
		} );
		return selected.length;
	},

	get: function ( i, value ) {
		var selected = this.entries.filter( function ( entry ) {
			return ( entry[ value ] && entry.isValid );
		} );
		return selected[ i ].pointSet;
	}

};


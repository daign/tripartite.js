GEOMETRY.PointStorePermanent = function () {

	this.entries = [];

};

GEOMETRY.PointStorePermanent.prototype = {

	constructor: GEOMETRY.PointStorePermanent,

	getNumberOfSelected: function () {
		return 0;
	},

	get: function ( i ) {
		return null;
	},

	getLength: function () {
		return this.entries.length;
	},

	forEach: function ( f ) {
		this.entries.forEach( f );
	}

};


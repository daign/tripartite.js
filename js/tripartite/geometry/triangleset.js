GEOMETRY.TriangleSet = function () {

	this.triangles = [];

};

GEOMETRY.TriangleSet.prototype = {

	constructor: GEOMETRY.TriangleSet,

	get: function ( i ) {
		return this.triangles[ i ];
	},

	getLength: function () {
		return this.triangles.length;
	},

	push: function ( triangle ) {
		this.triangles.push( triangle );
	},

	clear: function () {
		this.triangles = [];
	},

	forEach: function ( f ) {
		this.triangles.forEach( f );
	},

	clone: function () {
		var s = new GEOMETRY.TriangleSet();
		this.triangles.forEach( function ( triangle ) {
			s.push( triangle.clone() );
		} );
		return s;
	}

};


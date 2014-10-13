GEOMETRY.TriangleStore = function () {

	this.sets = [];
	this.hashes = [];
	this.hashingFunction = undefined;

};

GEOMETRY.TriangleStore.prototype = {

	constructor: GEOMETRY.TriangleStore,

	setHashingFunction: function ( hf ) {

		this.hashingFunction = hf;

	},

	sort: function () {

		this.sets.sort( function ( a, b ) {
			if ( a.value > b.value ) {
				return 1;
			} else if ( a.value < b.value ) {
				return -1;
			} else {
				return 0;
			}
		} );

	},

	storeCurrent: function () {

		var hash = this.hashingFunction();

		if ( !this.hashes.some( function ( h ) { return h === hash; } ) ) {
			this.hashes.push( hash );
			this.sets.push( { set: TRIANGLES.set.clone(), value: ALGORITHMS.getMeasure() } );
			this.sort();
		}

	},

	withdrawBest: function () {

		return this.sets.shift().set;

	}

};


GEOMETRY.TriangleStore = function () {

	this.entries = [];
	this.hashes = [];
	this.hashingFunction = undefined;

};

GEOMETRY.TriangleStore.prototype = {

	constructor: GEOMETRY.TriangleStore,

	setHashingFunction: function ( hf ) {

		this.hashingFunction = hf;

	},

	sort: function () {

		this.entries.sort( function ( a, b ) {
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
			this.entries.push( { set: TRIANGLES.set.clone(), value: ALGORITHMS.getMeasure() } );
			this.sort();
		}

	},

	withdrawBest: function () {

		return this.entries.shift();

	},

	clear: function () {

		this.entries.forEach( function ( entry ) {
			entry.set.clear();
		} );
		this.entries = [];
		this.hashes = [];
		this.hashingFunction = undefined;

	}

};


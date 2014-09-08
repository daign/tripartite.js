var GENERATOR = {

	min: 0,
	max: 100,

	pointSets: [],

	generate: function ( a, n ) {
		var floats = false;

		for ( var ai = 0; ai < a; ai++ ) {
			var pnts = [];
			for ( var gi = 0; gi < 3; gi++ ) {
				for ( var ni = 0; ni < n; ni++ ) {
					var x = ( floats ) ? this.randomFloat() : this.randomInt();
					var y = ( floats ) ? this.randomFloat() : this.randomInt();
					var z = ( floats ) ? this.randomFloat() : this.randomInt();
					var pnt = new Point( gi, [ x, y, z ] );
					pnts.push( pnt );
				}
			}
			this.pointSets.push( pnts );
		}

		return this;
	},

	activate: function ( i ) {
		POIS = this.pointSets[ i ];
	},

	randomFloat: function () {
		return ( Math.random() * ( this.max - this.min ) + this.min );
	},

	randomInt: function () {
		return ( Math.floor( Math.random() * ( this.max - this.min + 1 ) ) + this.min );
	}

};


var GENERATOR = {

	min: 0,
	max: 100,

	pointSets: [],

	generate: function ( a, n ) {
		var floats = true;
		this.pointSets = [];

		for ( var ai = 0; ai < a; ai++ ) {
			var pnts = [];
			for ( var gi = 0; gi < 3; gi++ ) {
				for ( var ni = 0; ni < n; ni++ ) {
					var x = ( floats ) ? this.randomFloat() : this.randomInt();
					var y = ( floats ) ? this.randomFloat() : this.randomInt();
					var z = ( floats ) ? this.randomFloat() : this.randomInt();
					var pnt = new GEOMETRY.Point( new THREE.Vector3( x, y, z ) );
					pnt.group = gi;
					pnt.buildMesh( VISUALISATION.MATERIALS.pointMaterials[ gi ] );
					pnts.push( pnt );
				}
			}
			this.pointSets.push( pnts );
		}

		return this;
	},

	activate: function ( i ) {
		VISUALISATION.scene.removeAll();
		TRIS = [];
		POIS = this.pointSets[ i ];
		ALGORITHMS.DATASTRUCTURE.resetVisited();
		ALGORITHMS.DATASTRUCTURE.GabrielGraph.reset();
		for ( var j = 0; j < POIS.length; j++ ) {
			VISUALISATION.scene.points.add( POIS[ j ].mesh );
		}
	},

	randomFloat: function () {
		return ( Math.random() * ( this.max - this.min ) + this.min );
	},

	randomInt: function () {
		return ( Math.floor( Math.random() * ( this.max - this.min + 1 ) ) + this.min );
	}

};


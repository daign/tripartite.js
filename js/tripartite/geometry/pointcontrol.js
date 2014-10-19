GEOMETRY.PointControl = {

	set: new GEOMETRY.PointSet(),
	store: [],

	generate: function ( a, n ) {
		for ( var ai = 0; ai < a; ai++ ) {
			var pointSet = new GEOMETRY.PointSet();
			pointSet.generateRandom( n );
			this.store.push( pointSet );
		}
		return this;
	},

	activate: function ( i ) {
		VISUALISATION.scene.removeAll();
		TRIANGLES.clear();
		this.set.removeMeshes();

		this.set = this.store[ i ];
		this.set.buildMeshes( VISUALISATION.MATERIALS.pointMaterials );
		ALGORITHMS.DATASTRUCTURE.resetVisited();
		ALGORITHMS.DATASTRUCTURE.GabrielGraph.reset();
	},

	getCopyOfPointsArray: function () {
		return this.set.getCopyOfPointsArray();
	},

	forEach: function ( f ) {
		this.set.forEach( f );
	}

};

var POINTS = GEOMETRY.PointControl;


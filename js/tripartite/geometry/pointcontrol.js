GEOMETRY.PointControl = {

	set: new GEOMETRY.PointSet(),
	useTemporary: true,
	storeTemporary: new GEOMETRY.PointStoreTemporary(),
	storePermanent: new GEOMETRY.PointStorePermanent(),

	activate: function ( i ) {
		PAGES.SIMULATION.visualisation.removeAll();
		TRIANGLES.clear();
		this.set.removeMeshes();

		if ( this.useTemporary ) {
			this.set = this.storeTemporary.get( i );
		} else {
			this.set = this.storePermanent.get( i );
		}
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


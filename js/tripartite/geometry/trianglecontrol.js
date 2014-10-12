GEOMETRY.TriangleControl = {

	set: new GEOMETRY.TriangleSet(),

	get: function ( i ) {
		return this.set.get( i );
	},

	getLength: function () {
		return this.set.getLength();
	},

	addTriangle: function ( points ) {

		var tng = new GEOMETRY.Triangle( points );
		tng.setPointsReference();
		this.set.push( tng );

		tng.buildMesh( VISUALISATION.MATERIALS.triangleMaterials.blue.shader );
		VISUALISATION.scene.triangles.add( tng.mesh );
		VISUALISATION.applyMaterialMode();

	},

	clear: function () {
		this.set.clear();
	},

	forEach: function ( f ) {
		this.set.forEach( f );
	}

};

var TRIANGLES = GEOMETRY.TriangleControl;


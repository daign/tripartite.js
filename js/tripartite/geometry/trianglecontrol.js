GEOMETRY.TriangleControl = {

	triangles: [],

	get: function ( i ) {
		return this.triangles[ i ];
	},

	getLength: function () {
		return this.triangles.length;
	},

	addTriangle: function ( points ) {
		var tng = new GEOMETRY.Triangle( points );
		this.triangles.push( tng );
		tng.buildMesh( VISUALISATION.MATERIALS.triangleMaterials.blue.shader );
		VISUALISATION.scene.triangles.add( tng.mesh );
		VISUALISATION.applyMaterialMode();
	},

	clear: function () {
		this.triangles = [];
	},

	forEach: function ( f ) {
		this.triangles.forEach( f );
	}

};

var TRIANGLES = GEOMETRY.TriangleControl;


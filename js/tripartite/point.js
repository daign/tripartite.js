var Point = function ( g, coords ) {
	this.group = g;
	this.x = coords[ 0 ];
	this.y = coords[ 1 ];
	this.z = coords[ 2 ];

	this.triangle = undefined;

	this.connections = [ [], [], [] ];
	this.visited = false;
	this.distanceToCenter = undefined;
	this.BFSVisited = false;

	var geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
	var mesh = new THREE.Mesh( geometry, VISU.pointMaterials[ this.group ] );
	mesh.position = new THREE.Vector3( this.x, this.y, this.z );
	VISU.scene.points.add( mesh );
};

Point.prototype = {
	constructor: Point,
	getVector: function () {
		return new THREE.Vector3( this.x, this.y, this.z );
	}
};


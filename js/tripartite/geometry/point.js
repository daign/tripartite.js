GEOMETRY.Point = function ( coords ) {
	this.coords = coords;

	this.group = undefined;
	this.triangle = undefined;
	this.mesh = undefined;

	this.connections = [ [], [], [] ];
	this.visited = false;
	this.distanceToCenter = undefined;
	this.BFSVisited = false;

};

GEOMETRY.Point.prototype = {
	constructor: GEOMETRY.Point,
	getVector: function () {
		return this.coords.clone();
	},
	buildMesh: function ( material ) {
		var geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position = this.coords;
		return this.mesh;
	}
};


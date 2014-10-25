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

	buildMesh: function ( materials ) {
		this.geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
		this.mesh = new THREE.Mesh( this.geometry, materials[ this.group ] );
		this.mesh.position = this.coords;
		return this.mesh;
	},

	removeMesh: function () {
		this.mesh = undefined;
		this.geometry = undefined;
	},

	clone: function () {
		var point = new GEOMETRY.Point( this.coords.clone() );
		point.group = this.group;
		return point;
	},

	toString: function () {
		return ( '[' + this.coords.x + ', ' + this.coords.y + ', ' + this.coords.z + ']' );
	},

	equals: function ( p ) {
		return this.coords.equals( p.coords );
	}

};


GEOMETRY.PointSet = function () {

	this.points = [];

};

GEOMETRY.PointSet.prototype = {

	constructor: GEOMETRY.PointSet,

	generateRandom: function ( n ) {

		var min = 0;
		var max = 100;

		var randomFloat = function () {
			return ( Math.random() * ( max - min ) + min );
		};

		var randomInt = function () {
			return ( Math.floor( Math.random() * ( max - min + 1 ) ) + min );
		};

		var floats = true;

		for ( var gi = 0; gi < 3; gi++ ) {
			for ( var ni = 0; ni < n; ni++ ) {
				var x = ( floats ) ? randomFloat() : randomInt();
				var y = ( floats ) ? randomFloat() : randomInt();
				var z = ( floats ) ? randomFloat() : randomInt();
				var point = new GEOMETRY.Point( new THREE.Vector3( x, y, z ) );
				point.group = gi;
				this.points.push( point );
			}
		}

	},

	clear: function () {
		this.removeMeshes();
		this.points = [];
	},

	buildMeshes: function ( materials ) {
		this.points.forEach( function ( point ) {
			var mesh = point.buildMesh( materials );
			PAGES.SIMULATION.visualisation.points.add( mesh );
		} );
	},

	removeMeshes: function () {
		this.points.forEach( function ( point ) {
			point.removeMesh();
		} );
	},

	forEach: function ( f ) {
		this.points.forEach( f );
	},

	getCopyOfPointsArray: function () {
		return this.points.slice();
	},

	computeCenter: function () {
		var l = this.points.length;
		var sx = 0;
		var sy = 0;
		var sz = 0;
		for ( var i = 0; i < l; i++ ) {
			sx += this.points[ i ].coords.x;
			sy += this.points[ i ].coords.y;
			sz += this.points[ i ].coords.z;
		}
		return new THREE.Vector3( sx/l, sy/l, sz/l );
	},

	clone: function () {
		var pointSet = new GEOMETRY.PointSet();
		pointSet.points = this.getCopyOfPointsArray();
		return pointSet;
	}

};


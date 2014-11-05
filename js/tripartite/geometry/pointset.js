GEOMETRY.PointSet = function () {

	this.name = '';
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
				this.points.push( new GEOMETRY.Point( new THREE.Vector3( x, y, z ), gi ) );
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

	removePoint: function ( point ) {
		var index = this.points.indexOf( point );
		if ( index !== -1 ) {
			this.points.splice( index, 1 );
		}
	},

	forEach: function ( f ) {
		this.points.forEach( f );
	},

	getCopyOfPointsArray: function () {
		return this.points.slice();
	},

	getGroupSize: function ( g ) {
		var grouped = this.points.filter( function ( point ) {
			return ( point.group === g );
		} );
		return grouped.length;
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
		this.points.forEach( function ( point ) {
			pointSet.points.push( point.clone() );
		} );
		pointSet.name = this.name;
		return pointSet;
	},

	parseFromFile: function ( text ) {

		var self = this;
		var returnValue = true;
		var pattern1 = /\]\s*,\s*\[/;
		var pattern2 = /[^\d.-]/g;

		var groups = text.split( '\n' );
		if ( groups.length < 3 ) { returnValue = false; }
		groups.forEach( function ( groupText, groupIndex ) {

			if ( groupIndex < 3 ) {

				var points = groupText.split( pattern1 );
				points.forEach( function ( pointText ) {

					var coords = pointText.split( ',' );
					if ( coords.length !== 3 ) { returnValue = false; return; }
					var x = parseFloat( coords[ 0 ].replace( pattern2, '' ) );
					var y = parseFloat( coords[ 1 ].replace( pattern2, '' ) );
					var z = parseFloat( coords[ 2 ].replace( pattern2, '' ) );

					self.points.push( new GEOMETRY.Point( new THREE.Vector3( x, y, z ), groupIndex ) );

				} );

			}

		} );

		return returnValue;

	},

	exportToFile: function () {

		var groups = [ [], [], [] ];
		this.points.forEach( function ( point ) {
			groups[ point.group ].push( point.toString() );
		} );

		var lines = [];
		groups.forEach( function ( group ) {
			lines.push( '[' + group.join( ', ' ) + ']' );
		} );

		var text = lines.join( '\n' );
		return text;

	},

	isValid: function () {
		return ( this.hasEqualSizedGroups() && !this.hasDoublePoints() );
	},

	hasEqualSizedGroups: function () {

		var n = this.points.length;
		if ( n%3 !== 0 ) { return false; }

		var gl = n/3;

		for ( var g = 0; g < 3; g++ ) {
			var grouped = this.points.filter( function ( point ) {
				return ( point.group === g );
			} );
			if ( grouped.length !== gl ) {
				return false;
			}
		}

		return true;

	},

	hasDoublePoints: function () {

		for ( var i = 0; i < this.points.length; i++ ) {
			for ( var j = i+1; j < this.points.length; j++ ) {
				if ( this.points[ i ].equals( this.points[ j ] ) ) {
					return true;
				}
			}
		}

		return false;

	}

};


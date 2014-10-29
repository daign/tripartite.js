GEOMETRY.Triangle = function ( points ) {

	this.points = points;
	this.points.sort( function ( a, b ) {
		if ( a.group > b.group ) {
			return 1;
		} else if ( a.group < b.group ) {
			return -1;
		} else {
			return 0;
		}
	} );
	if ( !this.isValid() ) { console.warn( 'triangle with wrong point group constellation' ); }

	this.math = new THREE.Triangle();
	this.updateMath();

	this.mesh = undefined;
	this.geometry = undefined;

};

GEOMETRY.Triangle.prototype = {

	constructor: GEOMETRY.Triangle,

	isValid: function () {

		return (
			   this.points[ 0 ].group === 0
			&& this.points[ 1 ].group === 1
			&& this.points[ 2 ].group === 2
		);

	},

	clone: function () {

		return new GEOMETRY.Triangle( this.points.slice() );

	},

	updateMath: function () {

		this.math.set( this.points[ 0 ].coords, this.points[ 1 ].coords, this.points[ 2 ].coords );

	},

	buildMesh: function ( material ) {

		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push( this.points[ 0 ].coords );
		this.geometry.vertices.push( this.points[ 1 ].coords );
		this.geometry.vertices.push( this.points[ 2 ].coords );
		this.geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
		this.geometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
		this.geometry.dynamic = true;
		this.geometry.computeFaceNormals();

		this.mesh = new THREE.Mesh( this.geometry, material );

	},

	removeMesh: function () {

		this.mesh = undefined;
		this.geometry = undefined;

	},

	updateGeometry: function () {

		if ( this.geometry !== undefined ) {
			this.geometry.vertices[ 0 ] = this.points[ 0 ].coords;
			this.geometry.vertices[ 1 ] = this.points[ 1 ].coords;
			this.geometry.vertices[ 2 ] = this.points[ 2 ].coords;
			this.geometry.verticesNeedUpdate = true;
			this.geometry.computeFaceNormals();
		}

	},

	setPointsReference: function () {

		this.points[ 0 ].triangle = this;
		this.points[ 1 ].triangle = this;
		this.points[ 2 ].triangle = this;

	},

	swapPoint: function ( t2, n ) {

		var pt = this.points[ n ];
		this.points[ n ] = t2.points[ n ];
		t2.points[ n ] = pt;

		this.setPointsReference();
		this.updateGeometry();
		this.updateMath();

		t2.setPointsReference();
		t2.updateGeometry();
		t2.updateMath();

	},

	setMaterial: function ( material ) {

		this.mesh.material = material;
		this.mesh.material.needsUpdate = true;

	},

	isParallel: function ( t2 ) {
		var n1 = this.math.normal();
		var n2 = t2.math.normal();
		return n1.equals( n2 );
	},

	isSameLayer: function ( t2 ) {
		var e1 = new THREE.Plane();
		e1.setFromNormalAndCoplanarPoint( this.math.normal(), this.points[ 0 ].getVector() );
		var e2 = new THREE.Plane();
		e2.setFromNormalAndCoplanarPoint( t2.math.normal(), t2.points[ 0 ].getVector() );
		return e1.equals( e2 );
	},

	intersects: function ( t2 ) {
		if ( this.isParallel( t2 ) ) {
			if ( this.isSameLayer( t2 ) && (
				   this.math.containsPoint( t2.points[ 0 ].getVector() )
				|| this.math.containsPoint( t2.points[ 1 ].getVector() )
				|| this.math.containsPoint( t2.points[ 2 ].getVector() )
				|| t2.math.containsPoint( this.points[ 0 ].getVector() )
				|| t2.math.containsPoint( this.points[ 1 ].getVector() )
				|| t2.math.containsPoint( this.points[ 2 ].getVector() )
			) ) {
				return true;
			} else {
				return false;
			}
		} else {
			if (
				   this.intersectsLine( new THREE.Line3( t2.points[ 0 ].getVector(), t2.points[ 1 ].getVector() ) )
				|| this.intersectsLine( new THREE.Line3( t2.points[ 1 ].getVector(), t2.points[ 2 ].getVector() ) )
				|| this.intersectsLine( new THREE.Line3( t2.points[ 2 ].getVector(), t2.points[ 0 ].getVector() ) )
				|| t2.intersectsLine( new THREE.Line3( this.points[ 0 ].getVector(), this.points[ 1 ].getVector() ) )
				|| t2.intersectsLine( new THREE.Line3( this.points[ 1 ].getVector(), this.points[ 2 ].getVector() ) )
				|| t2.intersectsLine( new THREE.Line3( this.points[ 2 ].getVector(), this.points[ 0 ].getVector() ) )
			) {
				return true;
			} else {
				return false;
			}
		}
	},

	intersectsLine: function ( l ) {
		if ( this.isPointInPlane( l.start ) && this.isPointInPlane( l.end ) ) {
			if ( this.math.containsPoint( l.start ) || this.math.containsPoint( l.end ) ) {
				return true;
			} else {
				// one case is not detected: the line is in the same plane,
				// its start and end are outside the triangle, but it intersects
				return false;
			}
		} else if ( this.isPointInPlane( l.start ) && this.math.containsPoint( l.start ) ) {
			return true;
		} else if ( this.isPointInPlane( l.end ) && this.math.containsPoint( l.end ) ) {
			return true;
		} else {
			var e = this.math.plane();
			if ( e.isIntersectionLine( l ) ) {
				var x = e.intersectLine( l );
				if ( x !== undefined && this.math.containsPoint( x ) ) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	},

	isPointInPlane: function ( p ) {
		var e = this.math.plane();
		return ( e.distanceToPoint( p ) === 0 );
	},

	longestEdge: function () {
		var v0 = this.points[ 0 ].getVector();
		var v1 = this.points[ 1 ].getVector();
		var v2 = this.points[ 2 ].getVector();
		var e1 = v0.distanceTo( v1 );
		var e2 = v0.distanceTo( v2 );
		var e3 = v1.distanceTo( v2 );
		return Math.max( e1, e2, e3 );
	},

	maximumAngle: function () {
		var p0 = this.points[ 0 ].getVector();
		var p1 = this.points[ 1 ].getVector();
		var p2 = this.points[ 2 ].getVector();
		var v0 = p1.clone().sub( p0 );
		var v1 = p2.clone().sub( p1 );
		var v2 = p0.clone().sub( p2 );
		var a0 = v0.angleTo( v2.negate() );
		var a1 = v1.angleTo( v0.negate() );
		var a2 = v2.angleTo( v1.negate() );
		var aMax = Math.max( a0, Math.max( a1, a2 ) );
		return aMax;
	},

	minimumAngle: function () {
		var p0 = this.points[ 0 ].getVector();
		var p1 = this.points[ 1 ].getVector();
		var p2 = this.points[ 2 ].getVector();
		var v0 = p1.clone().sub( p0 );
		var v1 = p2.clone().sub( p1 );
		var v2 = p0.clone().sub( p2 );
		var a0 = v0.angleTo( v2.negate() );
		var a1 = v1.angleTo( v0.negate() );
		var a2 = v2.angleTo( v1.negate() );
		var aMin = Math.min( a0, Math.min( a1, a2 ) );
		return aMin;
	}

};


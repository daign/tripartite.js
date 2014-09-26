var Triangle = function ( points ) {
	this.points = points;

	points[ 0 ].triangle = this;
	points[ 1 ].triangle = this;
	points[ 2 ].triangle = this;

	this.geom = new THREE.Geometry();
	this.geom.vertices.push( this.points[ 0 ].getVector() );
	this.geom.vertices.push( this.points[ 1 ].getVector() );
	this.geom.vertices.push( this.points[ 2 ].getVector() );
	this.geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
	this.geom.faces.push( new THREE.Face3( 2, 1, 0 ) );
	this.geom.dynamic = true;
	this.geom.computeFaceNormals();
	this.mesh = new THREE.Mesh( this.geom, VISUALISATION.MATERIALS.triangleMaterials.normal.shader );

	this.updateTriangle();
};
Triangle.prototype = {

	constructor: Triangle,

	updateTriangle: function () {
		this.math = new THREE.Triangle( this.points[ 0 ].getVector(), this.points[ 1 ].getVector(), this.points[ 2 ].getVector() );
	},

	updateVertices: function () {
		this.geom.vertices[ 0 ] = this.points[ 0 ].getVector();
		this.geom.vertices[ 1 ] = this.points[ 1 ].getVector();
		this.geom.vertices[ 2 ] = this.points[ 2 ].getVector();
		this.geom.verticesNeedUpdate = true;
		this.geom.computeFaceNormals();
	},

	swapPoint: function ( t2, n ) {
		var pt = this.points[ n ];
		this.points[ n ] = t2.points[ n ];
		t2.points[ n ] = pt;

		this.points[ n ].triangle = this;
		t2.points[ n ].triangle = t2;

		this.updateVertices();
		t2.updateVertices();
		this.updateTriangle();
		t2.updateTriangle();
	},

	setMaterial: function ( highlighted ) {
		this.mesh.material = VISUALISATION.MATERIALS.triangleMaterials[ highlighted ? 'highlighted' : 'normal' ].shader;
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


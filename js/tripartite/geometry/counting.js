GEOMETRY.COUNTING = {
	countAllIntersections: function ( countingStatistics ) {
		var count = 0;
		for ( var i = 0; i < TRIANGLES.getLength(); i++ ) {
			for ( var j = i+1; j < TRIANGLES.getLength(); j++ ) {
				if ( TRIANGLES.get( i ).intersects( TRIANGLES.get( j ) ) ) {
					count++;
				}
				if ( countingStatistics ) {
					STATISTICS.count( 'intersectiontests' );
				}
			}
		}
		return count;
	},
	countAllAreas: function () {
		var a = 0;
		for ( var i = 0; i < TRIANGLES.getLength(); i++ ) {
			a += TRIANGLES.get( i ).math.area();
		}
		return a;
	},
	countAllLongestEdges: function () {
		var l = 0;
		for ( var i = 0; i < TRIANGLES.getLength(); i++ ) {
			l += TRIANGLES.get( i ).longestEdge();
		}
		return l;
	},
	countAllMaximumAngles: function () {
		var a = 0;
		for ( var i = 0; i < TRIANGLES.getLength(); i++ ) {
			a += TRIANGLES.get( i ).maximumAngle();
		}
		return a;
	},
	countAllMinimumAngles: function () {
		var a = 0;
		for ( var i = 0; i < TRIANGLES.getLength(); i++ ) {
			a += TRIANGLES.get( i ).minimumAngle();
		}
		return a;
	},
	getAllIntersectingTriangles: function ( countingStatistics ) {
		var count = 0;
		var results = [];
		for ( var i = 0; i < TRIANGLES.getLength(); i++ ) {
			for ( var j = i+1; j < TRIANGLES.getLength(); j++ ) {
				if ( TRIANGLES.get( i ).intersects( TRIANGLES.get( j ) ) ) {
					count++;
					if ( results.indexOf( TRIANGLES.get( i ) ) === -1 ) { results.push( TRIANGLES.get( i ) ); }
					if ( results.indexOf( TRIANGLES.get( j ) ) === -1 ) { results.push( TRIANGLES.get( j ) ); }
				}
				if ( countingStatistics ) {
					STATISTICS.count( 'intersectiontests' );
				}
			}
		}
		return [ count, results ];
	},
	getAllIntersectingPairs: function ( countingStatistics ) {
		var count = 0;
		var results = [];
		for ( var i = 0; i < TRIANGLES.getLength(); i++ ) {
			for ( var j = i+1; j < TRIANGLES.getLength(); j++ ) {
				if ( TRIANGLES.get( i ).intersects( TRIANGLES.get( j ) ) ) {
					count++;
					results.push( [ TRIANGLES.get( i ), TRIANGLES.get( j ) ] );
				}
				if ( countingStatistics ) {
					STATISTICS.count( 'intersectiontests' );
				}
			}
		}
		return [ count, results ];
	}
};

var COUNTING = GEOMETRY.COUNTING;


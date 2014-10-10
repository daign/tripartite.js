GEOMETRY.COUNTING = {
	countAllIntersections: function ( countingStatistics ) {
		var count = 0;
		for ( var i = 0; i < TRIS.length; i++ ) {
			for ( var j = i+1; j < TRIS.length; j++ ) {
				if ( TRIS[ i ].intersects( TRIS[ j ] ) ) {
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
		for ( var i = 0; i < TRIS.length; i++ ) {
			a += TRIS[ i ].math.area();
		}
		return a;
	},
	countAllLongestEdges: function () {
		var l = 0;
		for ( var i = 0; i < TRIS.length; i++ ) {
			l += TRIS[ i ].longestEdge();
		}
		return l;
	},
	countAllMaximumAngles: function () {
		var a = 0;
		for ( var i = 0; i < TRIS.length; i++ ) {
			a += TRIS[ i ].maximumAngle();
		}
		return a;
	},
	countAllMinimumAngles: function () {
		var a = 0;
		for ( var i = 0; i < TRIS.length; i++ ) {
			a += TRIS[ i ].minimumAngle();
		}
		return a;
	},
	getAllIntersectingTriangles: function ( countingStatistics ) {
		var count = 0;
		var results = [];
		for ( var i = 0; i < TRIS.length; i++ ) {
			for ( var j = i+1; j < TRIS.length; j++ ) {
				if ( TRIS[ i ].intersects( TRIS[ j ] ) ) {
					count++;
					if ( results.indexOf( TRIS[ i ] ) === -1 ) { results.push( TRIS[ i ] ); }
					if ( results.indexOf( TRIS[ j ] ) === -1 ) { results.push( TRIS[ j ] ); }
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
		for ( var i = 0; i < TRIS.length; i++ ) {
			for ( var j = i+1; j < TRIS.length; j++ ) {
				if ( TRIS[ i ].intersects( TRIS[ j ] ) ) {
					count++;
					results.push( [ TRIS[ i ], TRIS[ j ] ] );
				}
				if ( countingStatistics ) {
					STATISTICS.count( 'intersectiontests' );
				}
			}
		}
		return [ count, results ];
	}
};

COUNTING = GEOMETRY.COUNTING;


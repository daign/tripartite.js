ALGORITHMS.HASHING = {

	countingHash: {
		description: 'Hash from counted characteristics',
		get: function () {
			return (
				  COUNTING.countAllIntersections( true )
				+ '-' + Math.round( COUNTING.countAllAreas() )
				+ '-' + Math.round( COUNTING.countAllLongestEdges() )
				+ '-' + Math.round( COUNTING.countAllMaximumAngles() * 100 )
				+ '-' + Math.round( COUNTING.countAllMinimumAngles() * 100 )
			);
		}
	}

};


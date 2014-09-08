ALGO.OPTIMIZATIONMEASURE = {

	intersections: {
		description: 'Counts all intersections',
		shortcut: 'o.I',
		get: function () {
			var i = SIMULATION.QUALITY.countAllIntersections( true );
			return i;
		}
	},

	area: {
		description: 'Sums triangle areas',
		shortcut: 'o.A',
		get: function () {
			var a = SIMULATION.QUALITY.countAllAreas();
			return a;
		}
	},

	intersectionsAndArea: {
		description: 'Multiplies number of intersections with sum of triangle areas',
		shortcut: 'o.IA',
		get: function () {
			var i = SIMULATION.QUALITY.countAllIntersections( true );
			var a = SIMULATION.QUALITY.countAllAreas();
			return i*a;
		}
	},

	longestEdges: {
		description: 'Sums longest edge per triangle',
		shortcut: 'o.L',
		get: function () {
			var l = SIMULATION.QUALITY.countAllLongestEdges();
			return l;
		}
	},

	intersectionsAndLongestEdges: {
		description: 'Multiplies number of intersections with sum of longest edge per triangle',
		shortcut: 'o.IL',
		get: function () {
			var i = SIMULATION.QUALITY.countAllIntersections( true );
			var l = SIMULATION.QUALITY.countAllLongestEdges();
			return i*l;
		}
	},

	maximumAngles: {
		description: 'Sums maximum (Biggest) angle per triangle',
		shortcut: 'o.B',
		get: function () {
			var b = SIMULATION.QUALITY.countAllMaximumAngles();
			return b;
		}
	},

	intersectionsAndMaximumAngles: {
		description: 'Multiplies number of intersections with sum of maximum angle per triangle',
		shortcut: 'o.IB',
		get: function () {
			var i = SIMULATION.QUALITY.countAllIntersections( true );
			var b = SIMULATION.QUALITY.countAllMaximumAngles();
			return i*b;
		}
	},

	minimumAngles: {
		description: 'Inverse sum of minimum (Smallest) angle per triangle',
		shortcut: 'o.S',
		get: function () {
			var s = SIMULATION.QUALITY.countAllMinimumAngles();
			return 1/s;
		}
	},

	intersectionsAndMinimumAngles: {
		description: 'Multiplies number of intersections with inverse sum of minimum angle per triangle',
		shortcut: 'o.IS',
		get: function () {
			var i = SIMULATION.QUALITY.countAllIntersections( true );
			var s = SIMULATION.QUALITY.countAllMinimumAngles();
			return i*1/s;
		}
	}

};


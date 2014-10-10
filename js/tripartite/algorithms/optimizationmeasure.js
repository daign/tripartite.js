ALGORITHMS.OPTIMIZATIONMEASURE = {

	intersections: {
		description: 'Counts all intersections',
		shortcut: 'o.I',
		get: function () {
			var i = COUNTING.countAllIntersections( true );
			return i;
		}
	},

	area: {
		description: 'Sums triangle areas',
		shortcut: 'o.A',
		get: function () {
			var a = COUNTING.countAllAreas();
			return a;
		}
	},

	intersectionsAndArea: {
		description: 'Multiplies number of intersections with sum of triangle areas',
		shortcut: 'o.IA',
		get: function () {
			var i = COUNTING.countAllIntersections( true );
			var a = COUNTING.countAllAreas();
			return i*a;
		}
	},

	longestEdges: {
		description: 'Sums longest edge per triangle',
		shortcut: 'o.L',
		get: function () {
			var l = COUNTING.countAllLongestEdges();
			return l;
		}
	},

	intersectionsAndLongestEdges: {
		description: 'Multiplies number of intersections with sum of longest edge per triangle',
		shortcut: 'o.IL',
		get: function () {
			var i = COUNTING.countAllIntersections( true );
			var l = COUNTING.countAllLongestEdges();
			return i*l;
		}
	},

	maximumAngles: {
		description: 'Sums maximum (Biggest) angle per triangle',
		shortcut: 'o.B',
		get: function () {
			var b = COUNTING.countAllMaximumAngles();
			return b;
		}
	},

	intersectionsAndMaximumAngles: {
		description: 'Multiplies number of intersections with sum of maximum angle per triangle',
		shortcut: 'o.IB',
		get: function () {
			var i = COUNTING.countAllIntersections( true );
			var b = COUNTING.countAllMaximumAngles();
			return i*b;
		}
	},

	minimumAngles: {
		description: 'Inverse sum of minimum (Smallest) angle per triangle',
		shortcut: 'o.S',
		get: function () {
			var s = COUNTING.countAllMinimumAngles();
			return 1/s;
		}
	},

	intersectionsAndMinimumAngles: {
		description: 'Multiplies number of intersections with inverse sum of minimum angle per triangle',
		shortcut: 'o.IS',
		get: function () {
			var i = COUNTING.countAllIntersections( true );
			var s = COUNTING.countAllMinimumAngles();
			return i*1/s;
		}
	}

};


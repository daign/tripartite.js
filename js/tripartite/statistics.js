var STATISTICS = {

	results: [],
	setUp: -1,
	record: -1,

	clear: function () {
		this.results = [];
		this.setUp = -1;
		this.record = -1;
	},

	startNewSetUp: function ( triangleBuild, swapping, optimization ) {
		var label = (
			  ALGORITHMS.TRIANGLEBUILD[ triangleBuild ].shortcut + ' '
			+ ALGORITHMS.SWAPPING[ swapping ].shortcut + ' '
			+ ALGORITHMS.OPTIMIZATIONMEASURE[ optimization ].shortcut
		);
		this.setUp += 1;
		this.record = -1;
		this.results[ this.setUp ] = { label: label, records: [] };
		return label;
	},

	startNewRecord: function () {
		this.record += 1;
		var r = { swaps: 0, testswaps: 0, intersectiontests: 0 };
		this.results[ this.setUp ].records[ this.record ] = r;
		return r;
	},

	count: function ( v ) {
		this.results[ this.setUp ].records[ this.record ][ v ] += 1;
	},

	discount: function ( v ) {
		this.results[ this.setUp ].records[ this.record ][ v ] -= 1;
	},

	getData: function () {
		var labels = [];
		var data = { swaps: [], testswaps: [], allswaps: [], intersectiontests: [] };

		for ( var si = 0; si < this.results.length; si++ ) {
			var s = this.results[ si ];
			labels[ si ] = s.label;
			data.swaps[ si ] = [];
			data.testswaps[ si ] = [];
			data.allswaps[ si ] = [];
			data.intersectiontests[ si ] = [];
			for ( var ri = 0; ri < s.records.length; ri++ ) {
				var rec = s.records[ ri ];
				data.swaps[ si ].push( rec.swaps );
				data.testswaps[ si ].push( rec.testswaps );
				data.allswaps[ si ].push( rec.swaps + rec.testswaps );
				data.intersectiontests[ si ].push( rec.intersectiontests );
			}
		}

		return { labels: labels, data: data };

	}

};


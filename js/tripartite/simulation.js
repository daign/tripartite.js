var SIMULATION = {

	enabled: undefined,

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.style.display = 'none';
		document.body.appendChild( this.node );

		VISU.init();
		COUNTER.init();
	},

	show: function ( enabled ) {
		this.enabled = enabled;
		this.node.style.display = 'block';

		function onWindowResize() {
			if ( SIMULATION.enabled.visual ) {
				VISU.scene.resize();
			}
		}
		window.addEventListener( 'resize', onWindowResize, false );
		onWindowResize();
	},

	update: function () {
		if ( this.enabled.visual ) {
			VISU.update();
		}
		COUNTER.update();
	},

	swapPoints: function ( triangle1, triangle2, pointGroup, counting, testSwap ) {
		triangle1.swapPoint( triangle2, pointGroup );
		if ( counting ) {
			if ( testSwap ) {
				this.STATISTICS.count( 'testswaps' );
			} else {
				this.STATISTICS.count( 'swaps' );
			}
		}
	},

	QUALITY: {
		countAllIntersections: function ( countingStatistics ) {
			var count = 0;
			for ( var i = 0; i < TRIS.length; i++ ) {
				for ( var j = i+1; j < TRIS.length; j++ ) {
					if ( TRIS[ i ].intersects( TRIS[ j ] ) ) {
						count++;
					}
					if ( countingStatistics ) {
						SIMULATION.STATISTICS.count( 'intersectiontests' );
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
						SIMULATION.STATISTICS.count( 'intersectiontests' );
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
						SIMULATION.STATISTICS.count( 'intersectiontests' );
					}
				}
			}
			return [ count, results ];
		}
	},

	STATISTICS: {
		results: [],
		setUp: -1,
		record: -1,
		startNewSetUp: function ( triangleBuild, swapping, optimization ) {
			var label = (
				  ALGO.TRIANGLEBUILD[ triangleBuild ].shortcut + ' '
				+ ALGO.SWAPPING[ swapping ].shortcut + ' '
				+ ALGO.OPTIMIZATIONMEASURE[ optimization ].shortcut
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
	}

};


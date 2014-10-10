ALGORITHMS.SWAPPING = {

	strategySwapRandom: {
		description: 'Swapping with optimization strategy, choosing next randomly',
		shortcut: 's.SR',
		run: function () {
			var n = TRIS.length;
			var r1 = Math.round( Math.random()*(n-1) );
			var r2 = Math.round( Math.random()*(n-1) );
			if ( r1 !== r2 ) {
				var t1 = TRIS[ r1 ];
				var t2 = TRIS[ r2 ];
				var c = ALGORITHMS.getMeasure();
				var better = null;
				for ( var i = 0; i < 3; i++ ) {
					GEOMETRY.swapPoints( t1, t2, i, true, true ); // testswap
					var cn = ALGORITHMS.getMeasure();
					if ( cn <= c ) {
						better = i;
						c = cn;
					}
					GEOMETRY.swapPoints( t1, t2, i, true, true ); // undo testswap
				}
				if ( better !== null ) {
					GEOMETRY.swapPoints( t1, t2, better, true, false ); // real swap
					PAGES.SIMULATION.update();
				}
				if ( COUNTING.countAllIntersections( true ) === 0 ) {
					TIMECONTROL.clear();
					if ( ALGORITHMS.onFinish !== null ) {
						ALGORITHMS.onFinish();
					}
				}
			}
		}
	},

	strategySwapIntersecting: {
		description: 'Swapping with optimization strategy, choosing next from intersections',
		shortcut: 's.SI',
		run: function () {
			var n = TRIS.length;
			var x = COUNTING.getAllIntersectingTriangles( true );
			if ( x[ 0 ] === 0 ) {
				TIMECONTROL.clear();
				if ( ALGORITHMS.onFinish !== null ) {
					ALGORITHMS.onFinish();
				}
			} else {

				// first swap partner from intersections
				var t1 = x[ 1 ][ Math.round( Math.random() * ( x[ 1 ].length - 1 ) ) ];
				// second swap partner random
				var t2 = TRIS[ Math.round( Math.random() * ( n - 1 ) ) ];

				if ( t1 !== t2 ) {
					var c = ALGORITHMS.getMeasure();
					var better = null;
					for ( var i = 0; i < 3; i++ ) {
						GEOMETRY.swapPoints( t1, t2, i, true, true ); // testswap
						var cn = ALGORITHMS.getMeasure();
						if ( cn <= c ) {
							better = i;
							c = cn;
						}
						GEOMETRY.swapPoints( t1, t2, i, true, true ); // undo testswap
					}
					if ( better !== null ) {
						GEOMETRY.swapPoints( t1, t2, better, true, false ); // real swap
						PAGES.SIMULATION.update();
					}
				}
			}
		}
	},

	strategySwapIntersectingBFS: {
		description: 'Swapping with optimization strategy, choosing next from intersections with BFS',
		shortcut: 's.SIB',
		run: function () {
			var n = TRIS.length;
			var x = COUNTING.getAllIntersectingTriangles( true );
			if ( x[ 0 ] === 0 ) {
				TIMECONTROL.clear();
				if ( ALGORITHMS.onFinish !== null ) {
					ALGORITHMS.onFinish();
				}
			} else {

				// first swap partner from intersections
				var t1 = x[ 1 ][ Math.round( Math.random() * ( x[ 1 ].length - 1 ) ) ];

				// second swap partner through breadth-first search on Gabriel Graph
				ALGORITHMS.DATASTRUCTURE.GabrielGraph.setUp();
				ALGORITHMS.DATASTRUCTURE.resetBFS();
				var i = Math.round( Math.random()*2 );
				var pv = t1.points[ i ];
				pv.BFSVisited = true;
				var vi = 1;

				var better = false;
				var c = ALGORITHMS.getMeasure();

				var Queue = function () {
					this.arr = [];
				};
				Queue.prototype = {
					constructor: Queue,
					shift: function () {
						return this.arr.shift();
					},
					add: function ( x ) {
						for ( var i = 0; i < x.length; i++ ) {
							if ( !x[ i ].BFSVisited && this.arr.indexOf( x[ i ] ) === -1 ) {
								this.arr.push( x[ i ] );
							}
						}
					}
				};
				var q = new Queue();

				while ( !better && vi < n ) {

					function getNext() {
						q.add( pv.connections[ i ] );
						pv = q.shift();
						pv.BFSVisited = true;
						vi++;
						return pv.triangle;
					}

					var t2 = getNext();

					GEOMETRY.swapPoints( t1, t2, i, true, true ); // testswap
					var cn = ALGORITHMS.getMeasure();

					if ( cn <= c ) {
						better = true;
						STATISTICS.discount( 'testswaps' ); // count testswap as real swap
						STATISTICS.count( 'swaps' );
						VISUALISATION.scene.updateSwapLine( t1.points[ i ].getVector(), t2.points[ i ].getVector() );
						PAGES.SIMULATION.update();
					} else {
						GEOMETRY.swapPoints( t1, t2, i, true, true ); // undo testswap
					}

				}

			}
		}
	},

	strategySwapIntersectingBFS2: {
		description: 'Swapping with optimization strategy, choosing next from intersections with BFS',
		shortcut: 's.SIB2',
		run: function () {
			var n = TRIS.length;
			var x = COUNTING.getAllIntersectingPairs( true );
			if ( x[ 0 ] === 0 ) {
				TIMECONTROL.clear();
				if ( ALGORITHMS.onFinish !== null ) {
					ALGORITHMS.onFinish();
				}
			} else {

				var pair = x[ 1 ][ Math.round( Math.random() * ( x[ 1 ].length - 1 ) ) ];
				var p1 = Math.round( Math.random() );
				var p2 = ( p1 + 1 ) % 2;
				// first swap partner from intersections
				var t1 = pair[ p1 ];

				// second swap partner through breadth-first search on Gabriel Graph
				ALGORITHMS.DATASTRUCTURE.GabrielGraph.setUp();
				ALGORITHMS.DATASTRUCTURE.resetBFS();
				var i = Math.round( Math.random()*2 );
				var pv = pair[ p2 ].points[ i ]; // begin search with intersection partner
				var vi = 0;

				var better = false;
				var c = ALGORITHMS.getMeasure();

				var Queue = function () {
					this.arr = [];
				};
				Queue.prototype = {
					constructor: Queue,
					shift: function () {
						return this.arr.shift();
					},
					add: function ( x ) {
						for ( var i = 0; i < x.length; i++ ) {
							if ( !x[ i ].BFSVisited && this.arr.indexOf( x[ i ] ) === -1 ) {
								this.arr.push( x[ i ] );
							}
						}
					}
				};
				var q = new Queue();
				q.add( pv );

				while ( !better && vi < n ) {

					function getNext() {
						q.add( pv.connections[ i ] );
						pv = q.shift();
						pv.BFSVisited = true;
						vi++;
						return pv.triangle;
					}

					var t2 = getNext();
					if ( t1 !== t2 ) {

						GEOMETRY.swapPoints( t1, t2, i, true, true ); // testswap
						var cn = ALGORITHMS.getMeasure();

						if ( cn <= c ) {
							better = true;
							STATISTICS.discount( 'testswaps' ); // count testswap as real swap
							STATISTICS.count( 'swaps' );
							VISUALISATION.scene.updateSwapLine( t1.points[ i ].getVector(), t2.points[ i ].getVector() );
							PAGES.SIMULATION.update();
						} else {
							GEOMETRY.swapPoints( t1, t2, i, true, true ); // undo testswap
						}
					}

				}

			}
		}
	},

	randomSwap: {
		description: 'Random swapping without termination',
		shortcut: 's.R',
		run: function () {
			var n = TRIS.length;
			var r1 = Math.round( Math.random()*(n-1) );
			var r2 = Math.round( Math.random()*(n-1) );
			var p = Math.round( Math.random()*2 );
			GEOMETRY.swapPoints( TRIS[ r1 ], TRIS[ r2 ], p, true, false );
			PAGES.SIMULATION.update();
		}
	},

	none: {
		description: 'Halts after startup triangle connection',
		shortcut: 's.N',
		run: function () {
			TIMECONTROL.clear();
			if ( ALGORITHMS.onFinish !== null ) {
				ALGORITHMS.onFinish();
			}
		}
	}

};


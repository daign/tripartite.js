ALGORITHMS.TRIANGLEBUILD = {

	triangleBuildRandom: {
		description: 'Randomly connects points to triangles on startup',
		shortcut: 't.R',
		run: function ( swappingFunction ) {
			PAGES.INFOBOX.setPhase( 'triangleBuild' );

			var stacks = [ [], [], [] ];
			var pointsCopy = POINTS.getCopyOfPointsArray();
			for ( var i = pointsCopy.length; i > 0; i-- ) {
				var r = Math.round( Math.random() * (i-1) );
				var g = pointsCopy[ r ].group;
				stacks[ g ].push( pointsCopy.splice( r, 1 )[ 0 ] );
			}

			function build() {
				TRIANGLES.addTriangle( [ stacks[ 0 ].pop(), stacks[ 1 ].pop(), stacks[ 2 ].pop() ] );

				if ( stacks[ 0 ].length === 0 ) {
					TIMECONTROL.clear();
					PAGES.INFOBOX.setPhase( 'swapping' );
					PAGES.INFOSTATS.setPhaseChange();
					ALGORITHMS.SWAPPING[ swappingFunction ].initialise();
					TIMECONTROL.setTask( ALGORITHMS.SWAPPING[ swappingFunction ].run ).start();
				}
			}

			TIMECONTROL.setTask( build ).start();
		}
	},

	triangleBuildSorted: {
		description: 'Sorts points before connecting them to triangles on startup',
		shortcut: 't.S',
		run: function ( swappingFunction ) {
			PAGES.INFOBOX.setPhase( 'triangleBuild' );

			var stacks = [ [], [], [] ];
			POINTS.forEach( function ( point ) {
				stacks[ point.group ].push( point );
			} );

			function pointSort( a, b ) {
				if ( a.coords.y > b.coords.y ) {
					return -1;
				} else if ( a.coords.y < b.coords.y ) {
					return 1;
				} else {
					return 0;
				}
			}
			stacks[ 0 ].sort( pointSort );
			stacks[ 1 ].sort( pointSort );
			stacks[ 2 ].sort( pointSort );

			function build() {
				TRIANGLES.addTriangle( [ stacks[ 0 ].pop(), stacks[ 1 ].pop(), stacks[ 2 ].pop() ] );

				if ( stacks[ 0 ].length === 0 ) {
					TIMECONTROL.clear();
					PAGES.INFOBOX.setPhase( 'swapping' );
					PAGES.INFOSTATS.setPhaseChange();
					ALGORITHMS.SWAPPING[ swappingFunction ].initialise();
					TIMECONTROL.setTask( ALGORITHMS.SWAPPING[ swappingFunction ].run ).start();
				}
			}

			TIMECONTROL.setTask( build ).start();
		}
	},

	triangleBuildGabrielGraph: {
		description: 'Connects points to triangles on startup using proximity information from Gabriel graph',
		shortcut: 't.G',
		run: function ( swappingFunction ) {
			PAGES.INFOBOX.setPhase( 'triangleBuild' );

			ALGORITHMS.DATASTRUCTURE.GabrielGraph.setUp();

			var pointsCopy = POINTS.getCopyOfPointsArray();
			var p = pointsCopy[ Math.round( Math.random()*(pointsCopy.length-1) ) ];
			p.visited = true;
			var s = [];
			s.push( p );

			function build() {
				var ng = ( p.group + 1 ) % 3;
				var nc = p.connections[ ng ];
				var mp = null;
				var md = Infinity;
				for ( var nci = 0; nci < nc.length; nci++ ) {
					if ( s.length == 2 ) {
						var d = (
							  s[ 0 ].getVector().distanceTo( nc[ nci ].getVector() )
							+ s[ 1 ].getVector().distanceTo( nc[ nci ].getVector() )
						);
					} else {
						var d = p.getVector().distanceTo( nc[ nci ].getVector() );
					}
					if ( !nc[ nci ].visited && d < md ) {
						md = d;
						mp = nc[ nci ];
					}
				}
				if ( mp === null ) {
					pi = 0;
					while ( pi < pointsCopy.length && ( pointsCopy[ pi ].group !== ng || pointsCopy[ pi ].visited ) ) { pi++; }
					p = pointsCopy[ pi ];
				} else {
					p = mp;
				}

				p.visited = true;
				s.push( p );
				if ( s.length >= 3 ) {
					TRIANGLES.addTriangle( [ s.pop(), s.pop(), s.pop() ] );
				}
				if ( TRIANGLES.getLength()*3 >= pointsCopy.length ) {
					TIMECONTROL.clear();
					PAGES.INFOBOX.setPhase( 'swapping' );
					PAGES.INFOSTATS.setPhaseChange();
					ALGORITHMS.SWAPPING[ swappingFunction ].initialise();
					TIMECONTROL.setTask( ALGORITHMS.SWAPPING[ swappingFunction ].run ).start();
				}
			}

			TIMECONTROL.setTask( build ).start();
		}
	},

	triangleBuildGabrielGraphInwardsBFS: {
		description: 'Connects points to triangles progressing inwards using Gabriel graph and breadth-first search',
		shortcut: 't.GIB',
		run: function ( swappingFunction ) {
			PAGES.INFOBOX.setPhase( 'triangleBuild' );

			ALGORITHMS.DATASTRUCTURE.GabrielGraph.setUp();
			ALGORITHMS.DATASTRUCTURE.DistanceToCenter.setUp();

			var pointsCopy = POINTS.getCopyOfPointsArray();
			pointsCopy.sort( function ( a, b ) {
				if ( a.distanceToCenter > b.distanceToCenter ) {
					return -1;
				} else if ( a.distanceToCenter < b.distanceToCenter ) {
					return 1;
				} else {
					return 0;
				}
			} );

			var pi = 0;
			var p1 = pointsCopy[ pi ];

			function build() {
				p1.visited = true;
				pi++;

				function getNext( pa ) {
					var l = pa.length;
					var ng = ( pa[l-1].group + 1 ) % 3;
					ALGORITHMS.DATASTRUCTURE.resetBFS();

					var SortedQueue = function () {
						this.arr = [];
					};
					SortedQueue.prototype = {
						constructor: SortedQueue,
						shift: function () {
							return this.arr.shift();
						},
						addAndSort: function ( nc ) {
							for ( var i = 0; i < nc.length; i++ ) {
								if ( !nc[ i ].BFSVisited ) {
									this.arr.push( nc[ i ] );
								}
							}
							this.sort();
						},
						sort: function () {
							this.arr.sort( function ( a, b ) {
								if ( l === 2 ) {
									da = (
										  a.getVector().distanceTo( pa[0].getVector() )
										+ a.getVector().distanceTo( pa[1].getVector() )
									);
									db = (
										  b.getVector().distanceTo( pa[0].getVector() )
										+ b.getVector().distanceTo( pa[1].getVector() )
									);
								} else {
									da = a.getVector().distanceTo( pa[0].getVector() );
									db = b.getVector().distanceTo( pa[0].getVector() );
								}
								if ( da < db ) {
									return -1;
								} else if ( da > db ) {
									return 1;
								} else {
									return 0;
								}
							} );
						}
					};

					var queue = new SortedQueue();
					queue.addAndSort( pa[l-1].connections[ ng ] );
					var np = undefined;

					function workQueue() {
						np = queue.shift();
						if ( !np.visited ) {
							return;
						} else {
							np.BFSVisited = true;
							queue.addAndSort( np.connections[ ng ] );
							workQueue();
						}
					}
					workQueue();

					np.visited = true;
					return np;
				}
				var pa = [ p1 ];
				pa.push( getNext( pa ) );
				pa.push( getNext( pa ) );

				TRIANGLES.addTriangle( pa );

				if ( TRIANGLES.getLength()*3 >= pointsCopy.length ) {
					TIMECONTROL.clear();
					PAGES.INFOBOX.setPhase( 'swapping' );
					PAGES.INFOSTATS.setPhaseChange();
					ALGORITHMS.SWAPPING[ swappingFunction ].initialise();
					TIMECONTROL.setTask( ALGORITHMS.SWAPPING[ swappingFunction ].run ).start();
				} else {
					while( pointsCopy[ pi ].visited ) { pi++; }
					p1 = pointsCopy[ pi ];
				}
			}

			TIMECONTROL.setTask( build ).start();
		}
	}

};


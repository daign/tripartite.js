ALGO.TRIANGLEBUILD = {

	triangleBuildRandom: {
		description: 'Randomly connects points to triangles on startup',
		shortcut: 't.R',
		run: function ( swappingFunction ) {
			TRIS = [];
			PAGES.INFOBOX.setPhase( 'triangleBuild' );
			PAGES.SIMULATION.update();

			var stacks = [ [], [], [] ];
			var poisCopy = POIS.slice();
			for ( var i = poisCopy.length; i > 0; i-- ) {
				var r = Math.round( Math.random() * (i-1) );
				var g = poisCopy[ r ].group;
				stacks[ g ].push( poisCopy.splice( r, 1 )[ 0 ] );
			}

			function build() {
				var tng = new Triangle( [ stacks[ 0 ].pop(), stacks[ 1 ].pop(), stacks[ 2 ].pop() ] );
				PAGES.VISU.scene.triangles.add( tng.mesh );
				TRIS.push( tng );
				PAGES.SIMULATION.update();

				if ( stacks[ 0 ].length === 0 ) {
					TIMECONTROL.clear();
					ALGO.SWAPPING[ swappingFunction ].init();
					TIMECONTROL.start( ALGO.SWAPPING[ swappingFunction ].run );
				}
			}

			TIMECONTROL.start( build );
		}
	},

	triangleBuildSorted: {
		description: 'Sorts points before connecting them to triangles on startup',
		shortcut: 't.S',
		run: function ( swappingFunction ) {
			TRIS = [];
			PAGES.INFOBOX.setPhase( 'triangleBuild' );
			PAGES.SIMULATION.update();

			var stacks = [ [], [], [] ];
			for ( var i = 0; i < POIS.length; i++ ) {
				stacks[ POIS[ i ].group ].push( POIS[ i ] );
			}

			function pointSort( a, b ) {
				if ( a.y > b.y ) {
					return -1;
				} else if ( a.y < b.y ) {
					return 1;
				} else {
					return 0;
				}
			}
			stacks[ 0 ].sort( pointSort );
			stacks[ 1 ].sort( pointSort );
			stacks[ 2 ].sort( pointSort );

			function build() {
				var tng = new Triangle( [ stacks[ 0 ].pop(), stacks[ 1 ].pop(), stacks[ 2 ].pop() ] );
				PAGES.VISU.scene.triangles.add( tng.mesh );
				TRIS.push( tng );
				PAGES.SIMULATION.update();

				if ( stacks[ 0 ].length === 0 ) {
					TIMECONTROL.clear();
					ALGO.SWAPPING[ swappingFunction ].init();
					TIMECONTROL.start( ALGO.SWAPPING[ swappingFunction ].run );
				}
			}

			TIMECONTROL.start( build );
		}
	},

	triangleBuildGabrielGraph: {
		description: 'Connects points to triangles on startup using proximity information from Gabriel graph',
		shortcut: 't.G',
		run: function ( swappingFunction ) {
			TRIS = [];
			PAGES.INFOBOX.setPhase( 'triangleBuild' );
			PAGES.SIMULATION.update();

			ALGO.DATASTRUCTURE.GabrielGraph.setUp();

			var p = POIS[ Math.round( Math.random()*(POIS.length-1) ) ];
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
					while ( pi < POIS.length && ( POIS[ pi ].group !== ng || POIS[ pi ].visited ) ) { pi++; }
					p = POIS[ pi ];
				} else {
					p = mp;
				}

				p.visited = true;
				s.push( p );
				if ( s.length >= 3 ) {
					var tng = new Triangle( [ s.pop(), s.pop(), s.pop() ] );
					PAGES.VISU.scene.triangles.add( tng.mesh );
					TRIS.push( tng );
					PAGES.SIMULATION.update();
				}
				if ( TRIS.length*3 >= POIS.length ) {
					TIMECONTROL.clear();
					ALGO.SWAPPING[ swappingFunction ].init();
					TIMECONTROL.start( ALGO.SWAPPING[ swappingFunction ].run );
				}
			}

			TIMECONTROL.start( build );
		}
	},

	triangleBuildGabrielGraphInwardsBFS: {
		description: 'Connects points to triangles progressing inwards using Gabriel graph and breadth-first search',
		shortcut: 't.GIB',
		run: function ( swappingFunction ) {
			TRIS = [];
			PAGES.INFOBOX.setPhase( 'triangleBuild' );
			PAGES.SIMULATION.update();

			ALGO.DATASTRUCTURE.GabrielGraph.setUp();
			ALGO.DATASTRUCTURE.DistanceToCenter.setUp();
			POIS.sort( function ( a, b ) {
				if ( a.distanceToCenter > b.distanceToCenter ) {
					return -1;
				} else if ( a.distanceToCenter < b.distanceToCenter ) {
					return 1;
				} else {
					return 0;
				}
			} );

			var pi = 0;
			var p1 = POIS[ pi ];

			function build() {
				p1.visited = true;
				pi++;

				function getNext( pa ) {
					var l = pa.length;
					var ng = ( pa[l-1].group + 1 ) % 3;
					ALGO.DATASTRUCTURE.resetBFS();

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

				var tng = new Triangle( pa );
				PAGES.VISU.scene.triangles.add( tng.mesh );
				TRIS.push( tng );
				PAGES.SIMULATION.update();

				if ( TRIS.length*3 >= POIS.length ) {
					TIMECONTROL.clear();
					ALGO.SWAPPING[ swappingFunction ].init();
					TIMECONTROL.start( ALGO.SWAPPING[ swappingFunction ].run );
				} else {
					while( POIS[ pi ].visited ) { pi++; }
					p1 = POIS[ pi ];
				}
			}

			TIMECONTROL.start( build );
		}
	}

};

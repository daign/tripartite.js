ALGORITHMS.DATASTRUCTURE = {

	GabrielGraph: {
		description: 'Proximity information from Gabriel Graph',
		computed: false,
		setUp: function () {
			if ( !ALGORITHMS.DATASTRUCTURE.GabrielGraph.computed ) {
				ALGORITHMS.DATASTRUCTURE.GabrielGraph.computed = true;

				var conns = [ [], [], [], [] ];
				var pointsCopy = POINTS.getCopyOfPointsArray();

				for ( var a = 0; a < pointsCopy.length; a++ ) {
					var gA = pointsCopy[ a ].group;
					for ( var b = 0; b < pointsCopy.length; b++ ) {
						if ( a !== b ) {
							var gB = pointsCopy[ b ].group;
							var m = pointsCopy[ a ].getVector().clone().add( pointsCopy[ b ].getVector() ).divideScalar( 2 );
							var d = pointsCopy[ a ].getVector().distanceTo( m );
							var shortest = true;
							for ( var c = 0; c < pointsCopy.length; c++ ) {
								if ( c !== a && c !== b && pointsCopy[ c ].group === gB ) {
									if ( pointsCopy[ c ].getVector().distanceTo( m ) < d ) {
										shortest = false;
									}
								}
							}
							if ( shortest ) {
								pointsCopy[ a ].connections[ gB ].push( pointsCopy[ b ] );
								if ( gA === gB ) {
									conns[ gA ].push( [ pointsCopy[ a ].getVector(), pointsCopy[ b ].getVector() ] );
								} else {
									conns[ 3 ].push( [ pointsCopy[ a ].getVector(), pointsCopy[ b ].getVector() ] );
								}
							}
						}
					}
				}

				// add lines to visualisation
				if ( PAGES.SIMULATION.visualisation.enabled ) {

					for ( var g = 0; g < conns.length; g++ ) {
						for ( var i = 0; i < conns[ g ].length; i++ ) {
							var lineGeometry = new THREE.Geometry();
							lineGeometry.vertices.push( conns[ g ][ i ][ 0 ], conns[ g ][ i ][ 1 ] );
							lineGeometry.computeLineDistances();

							var line = new THREE.Line( lineGeometry, VISUALISATION.MATERIALS.lineMaterials[ g ], THREE.LinePieces );
							PAGES.SIMULATION.visualisation.lines[ g ].add( line );
						}
					}

					PAGES.SIMULATION.visualisation.applyGabrielMode();
					PAGES.INFOBOX.gabrielSelect.setActivation( true );

				}

			}
		},
		reset: function () {
			if ( ALGORITHMS.DATASTRUCTURE.GabrielGraph.computed ) {
				POINTS.forEach( function ( point ) {
					point.connections = [ [], [], [] ];
				} );
				ALGORITHMS.DATASTRUCTURE.GabrielGraph.computed = false;
				PAGES.INFOBOX.gabrielSelect.setActivation( false );
			}
		}
	},

	DistanceToCenter: {
		description: 'Giving each point its distance to the center',
		setUp: function () {
			var center = POINTS.set.computeCenter();
			POINTS.forEach( function ( point ) {
				point.distanceToCenter = point.getVector().distanceTo( center );
			} );
		}
	},

	resetBFS: function () {
		POINTS.forEach( function ( point ) {
			point.BFSVisited = false;
		} );
	},

	resetVisited: function () {
		POINTS.forEach( function ( point ) {
			point.visited = false;
		} );
	}

};


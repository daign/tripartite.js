ALGO.DATASTRUCTURE = {

	GabrielGraph: {
		description: 'Proximity information from Gabriel Graph',
		computed: false,
		setUp: function () {
			if ( !ALGO.DATASTRUCTURE.GabrielGraph.computed ) {
				ALGO.DATASTRUCTURE.GabrielGraph.computed = true;

				var conns = [ [], [], [], [] ];

				for ( var a = 0; a < POIS.length; a++ ) {
					var gA = POIS[ a ].group;
					for ( var b = 0; b < POIS.length; b++ ) {
						if ( a !== b ) {
							var gB = POIS[ b ].group;
							var m = POIS[ a ].getVector().clone().add( POIS[ b ].getVector() ).divideScalar( 2 );
							var d = POIS[ a ].getVector().distanceTo( m );
							var shortest = true;
							for ( var c = 0; c < POIS.length; c++ ) {
								if ( c !== a && c !== b && POIS[ c ].group === gB ) {
									if ( POIS[ c ].getVector().distanceTo( m ) < d ) {
										shortest = false;
									}
								}
							}
							if ( shortest ) {
								POIS[ a ].connections[ gB ].push( POIS[ b ] );
								if ( gA === gB ) {
									conns[ gA ].push( [ POIS[ a ].getVector(), POIS[ b ].getVector() ] );
								} else {
									conns[ 3 ].push( [ POIS[ a ].getVector(), POIS[ b ].getVector() ] );
								}
							}
						}
					}
				}

				// add lines to visualisation
				if ( PAGES.SIMULATION.visualEnabled ) {

					for ( var g = 0; g < conns.length; g++ ) {
						for ( var i = 0; i < conns[ g ].length; i++ ) {
							var lineGeometry = new THREE.Geometry();
							lineGeometry.vertices.push( conns[ g ][ i ][ 0 ], conns[ g ][ i ][ 1 ] );
							lineGeometry.computeLineDistances();

							var line = new THREE.Line( lineGeometry, VISUALISATION.MATERIALS.lineMaterials[ g ], THREE.LinePieces );
							VISUALISATION.scene.lines[ g ].add( line );
						}
					}

					VISUALISATION.applyGabrielMode();
					PAGES.INFOBOX.gabrielSelect.setActivation( true );

				}

			}
		},
		reset: function () {
			if ( ALGO.DATASTRUCTURE.GabrielGraph.computed ) {
				for ( var i = 0; i < POIS.length; i++ ) {
					POIS[ i ].connections = [ [], [], [] ];
				}
				ALGO.DATASTRUCTURE.GabrielGraph.computed = false;
				PAGES.INFOBOX.gabrielSelect.setActivation( false );
			}
		}
	},

	DistanceToCenter: {
		description: 'Giving each point its distance to the center',
		setUp: function () {
			var l = POIS.length;
			var sx = 0;
			var sy = 0;
			var sz = 0;
			for ( var i = 0; i < l; i++ ) {
				sx += POIS[ i ].coords.x;
				sy += POIS[ i ].coords.y;
				sz += POIS[ i ].coords.z;
			}
			var center = new THREE.Vector3( sx/l, sy/l, sz/l );
			for ( var i = 0; i < l; i++ ) {
				POIS[ i ].distanceToCenter = POIS[ i ].getVector().distanceTo( center );
			}
		}
	},

	resetBFS: function () {
		for ( var i = 0; i < POIS.length; i++ ) {
			POIS[ i ].BFSVisited = false;
		}
	},
	resetVisited: function () {
		for ( var i = 0; i < POIS.length; i++ ) {
			POIS[ i ].visited = false;
		}
	}

};


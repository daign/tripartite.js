PAGES.SETTINGS = {

	init: function () {
		var self = this;

		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'settings';
		this.node.style.overflow = 'auto';
		document.body.appendChild( this.node );

		PAGES.add( this.node, 'settings', function () { ; } );

		function onChange() {
			self.updateDescriptions();
		}

		// settings for visualizations
		this.menu1 = document.createElement( 'div' );
		this.menu1.setAttribute( 'class', 'box' );
		this.node.appendChild( this.menu1 );
		this.menu1.appendChild( document.createTextNode( 'Algorithm Visualizations' ) );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// number of points
		this.menu1.appendChild( document.createTextNode( 'Points: ' ) );
		this.sel0 = new this.Select( this.menu1, false, 1, null, [
			[ '10', '3x10' ],
			[ '30', '3x30' ],
			[ '60', '3x60' ]
		] );

		// triangle build algorithm
		this.menu1.appendChild( document.createElement( 'br' ) );
		this.menu1.appendChild( document.createTextNode( 'Triangle Build: ' ) );
		this.sel1 = new this.Select( this.menu1, false, 1, onChange, [
			[ 'triangleBuildRandom',                 'Random' ],
			[ 'triangleBuildSorted',                 'Sorted' ],
			[ 'triangleBuildGabrielGraph',           'Gabriel Graph' ],
			[ 'triangleBuildGabrielGraphInwardsBFS', 'Gabriel Graph Inwards BFS' ]
		] );
		this.menu1.appendChild( document.createTextNode( '   ' ) );
		this.sel1des = document.createElement( 'span' );
		this.sel1des.setAttribute( 'class', 'description' );
		this.menu1.appendChild( this.sel1des );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// swapping algorithm
		this.menu1.appendChild( document.createTextNode( 'Swapping: ' ) );
		this.sel2 = new this.Select( this.menu1, false, 0, onChange, [
			[ 'strategySwapRandom',           'Strategy Swap Random' ],
			[ 'strategySwapIntersecting',     'Strategy Swap Intersecting' ],
			[ 'strategySwapIntersectingBFS',  'Strategy Swap Intersecting BFS' ],
			[ 'strategySwapIntersectingBFS2', 'Strategy Swap Intersecting BFS 2' ],
			[ 'randomSwap',                   'Random' ],
			[ 'none',                         'None' ]
		] );
		this.menu1.appendChild( document.createTextNode( '   ' ) );
		this.sel2des = document.createElement( 'span' );
		this.sel2des.setAttribute( 'class', 'description' );
		this.menu1.appendChild( this.sel2des );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// optimization measure
		this.menu1.appendChild( document.createTextNode( 'Optimization Measure: ' ) );
		this.sel2b = new this.Select( this.menu1, false, 1, onChange, [
			[ 'intersections',                 'Intersections' ],
			[ 'intersectionsAndArea',          'Intersections and Area' ],
			[ 'intersectionsAndLongestEdges',  'Intersections and Longest Edges' ],
			[ 'intersectionsAndMaximumAngles', 'Intersections and Maximum Angles' ],
			[ 'intersectionsAndMinimumAngles', 'Intersections and Inverse Minimum Angles' ],
			[ 'area',                          'Area' ],
			[ 'longestEdges',                  'Longest Edges' ],
			[ 'maximumAngles',                 'Maximum Angles' ],
			[ 'minimumAngles',                 'Inverse Minimum Angles' ]
		] );
		this.menu1.appendChild( document.createTextNode( '   ' ) );
		this.sel2bdes = document.createElement( 'span' );
		this.sel2bdes.setAttribute( 'class', 'description' );
		this.menu1.appendChild( this.sel2bdes );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// speed
		this.menu1.appendChild( document.createTextNode( 'Speed: ' ) );
		this.sel3 = new this.Select( this.menu1, false, 1, null, [
			[ '500', 'Slow'     ],
			[ '100', 'Moderate' ],
			[ '50',  'Fast'     ],
			[ '1',   'Fastest'  ]
		] );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// start button
		var start1 =  document.createElement( 'input' );
		start1.type = 'button';
		start1.value = 'Start';
		function start1fun() {
			var triangleBuildFunction = self.sel1.node.value;
			var swappingFunction = self.sel2.node.value;
			var optimizationFunction = self.sel2b.node.value;

			PAGES.SIMULATION.visualEnabled = true;
			PAGES.show( 'simulation' );
			TIMECONTROL.setSpeed( parseInt( self.sel3.node.value ) ).setPaused( false );
			PAGES.INFOBOX.setPass( undefined );

			STATISTICS.clear();
			PAGES.INFOBOX.setSetUp( STATISTICS.startNewSetUp( triangleBuildFunction, swappingFunction, optimizationFunction ) );
			PAGES.INFOBOX.setRecord( STATISTICS.startNewRecord() );
			GENERATOR.generate( 1, parseInt( self.sel0.node.value ) ).activate( 0 );
			function onFinish() {
				PAGES.INFOBOX.setPhase( 'finished' ).update();
			}
			ALGO.run( triangleBuildFunction, swappingFunction, optimizationFunction, onFinish );
		}
		start1.addEventListener( 'click', start1fun, false );
		this.menu1.appendChild( start1 );


		// settings for comparisons
		this.menu2 = document.createElement( 'div' );
		this.menu2.setAttribute( 'class', 'box' );
		this.node.appendChild( this.menu2 );
		this.menu2.appendChild( document.createTextNode( 'Algorithm Comparisons' ) );
		this.menu2.appendChild( document.createElement( 'br' ) );

		// number of iterations
		this.menu2.appendChild( document.createTextNode( 'Iterations: ' ) );
		this.sel4 = new this.Select( this.menu2, false, 1, onChange, [
			[  '3',  '3' ],
			[ '10', '10' ],
			[ '30', '30' ]
		] );
		this.menu2.appendChild( document.createElement( 'br' ) );

		// number of points
		this.menu2.appendChild( document.createTextNode( 'Points: ' ) );
		this.sel5 = new this.Select( this.menu2, false, 1, onChange, [
			[ '10', '3x10' ],
			[ '30', '3x30' ],
			[ '60', '3x60' ]
		] );
		this.menu2.appendChild( document.createElement( 'br' ) );
		var table1 = document.createElement( 'table' );
		this.menu2.appendChild( table1 );
		var tr1 = document.createElement( 'tr' );
		table1.appendChild( tr1 );

		// triangle build algorithm
		var td1 = document.createElement( 'td' );
		tr1.appendChild( td1 );
		td1.appendChild( document.createTextNode( 'Triangle Build: ' ) );
		var td2 = document.createElement( 'td' );
		tr1.appendChild( td2 );
		this.sel6 = new this.Select( td2, true, 0, onChange, [
			[ 'triangleBuildRandom',                 'Random' ],
			[ 'triangleBuildSorted',                 'Sorted' ],
			[ 'triangleBuildGabrielGraph',           'Gabriel Graph' ],
			[ 'triangleBuildGabrielGraphInwardsBFS', 'Gabriel Graph Inwards BFS' ]
		] );
		this.sel6.node.style.height = '100px';

		// swapping algorithm
		var td3 = document.createElement( 'td' );
		tr1.appendChild( td3 );
		td3.appendChild( document.createTextNode( 'Swapping: ' ) );
		var td4 = document.createElement( 'td' );
		tr1.appendChild( td4 );
		this.sel7 = new this.Select( td4, true, 0, onChange, [
			[ 'strategySwapRandom',           'Strategy Swap Random' ],
			[ 'strategySwapIntersecting',     'Strategy Swap Intersecting' ],
			[ 'strategySwapIntersectingBFS',  'Strategy Swap Intersecting BFS' ],
			[ 'strategySwapIntersectingBFS2', 'Strategy Swap Intersecting BFS 2' ],
		] );
		this.sel7.node.style.height = '100px';

		// optimization measure
		var td5 = document.createElement( 'td' );
		tr1.appendChild( td5 );
		td5.appendChild( document.createTextNode( 'Optimization Measure: ' ) );
		var td6 = document.createElement( 'td' );
		tr1.appendChild( td6 );
		this.sel8 = new this.Select( td6, true, 0, onChange, [
			[ 'intersections',                 'Intersections' ],
			[ 'intersectionsAndArea',          'Intersections and Area' ],
			[ 'intersectionsAndLongestEdges',  'Intersections and Longest Edges' ],
			[ 'intersectionsAndMaximumAngles', 'Intersections and Maximum Angles' ],
			[ 'intersectionsAndMinimumAngles', 'Intersections and Inverse Minimum Angles' ]
		] );
		this.sel8.node.style.height = '100px';

		// start button
		var start2 =  document.createElement( 'input' );
		start2.type = 'button';
		start2.value = 'Start';
		function start2fun() {
			var triangleBuildAlgos = [];
			var o1 = self.sel6.node.options;
			for ( var i = 0; i < o1.length; i++ ) {
				if ( o1[ i ].selected ) {
					triangleBuildAlgos.push( o1[ i ].value );
				}
			}
			var swappingAlgos = [];
			var o2 = self.sel7.node.options;
			for ( var i = 0; i < o2.length; i++ ) {
				if ( o2[ i ].selected ) {
					swappingAlgos.push( o2[ i ].value );
				}
			}
			var optimizationAlgos = [];
			var o3 = self.sel8.node.options;
			for ( var i = 0; i < o3.length; i++ ) {
				if ( o3[ i ].selected ) {
					optimizationAlgos.push( o3[ i ].value );
				}
			}
			if ( triangleBuildAlgos.length === 0 || swappingAlgos.length === 0 || optimizationAlgos.length === 0 ) {
				console.log( 'Please select at least one of each.' );
				return;
			}

			PAGES.SIMULATION.visualEnabled = false;
			PAGES.show( 'simulation' );
			TIMECONTROL.setSpeed( 1 ).setPaused( false );

			STATISTICS.clear();

			var iterations = parseInt( self.sel4.node.value );
			GENERATOR.generate( iterations, parseInt( self.sel5.node.value ) );

			var tbi = -1;
			var swi = -1;
			var omi = -1;
			var psi = -1;
			var ai = 0;
			var al = iterations * swappingAlgos.length * triangleBuildAlgos.length * optimizationAlgos.length;

			function doNext() {
				psi = ( psi+1 ) % iterations;
				if ( psi === 0 ) {
					omi = ( omi+1 ) % optimizationAlgos.length;
					if ( omi === 0 ) {
						swi = ( swi+1 ) % swappingAlgos.length;
						if ( swi === 0 ) {
							tbi = tbi+1;
							if ( tbi >= triangleBuildAlgos.length ) {
								PAGES.INFOBOX.setPhase( 'finished' ).update();
								PAGES.show( 'results' );
								return;
							}
						}
					}
					PAGES.INFOBOX.setSetUp(
						STATISTICS.startNewSetUp( triangleBuildAlgos[ tbi ], swappingAlgos[ swi ], optimizationAlgos[ omi ] )
					);
				}
				GENERATOR.activate( psi );
				ai++;

				PAGES.INFOBOX.setRecord( STATISTICS.startNewRecord() );
				PAGES.INFOBOX.setPass( ai + ' of ' + al );
				ALGO.run( triangleBuildAlgos[ tbi ], swappingAlgos[ swi ], optimizationAlgos[ omi ], doNext );
			}
			doNext();

		}
		start2.addEventListener( 'click', start2fun, false );
		this.menu2.appendChild( start2 );
		this.menu2.appendChild( document.createTextNode( '   ' ) );
		this.start2help = document.createElement( 'span' );
		this.start2help.setAttribute( 'class', 'description' );
		this.menu2.appendChild( this.start2help );


		// settings menu 3
		/*this.menu3 = document.createElement( 'div' );
		this.menu3.setAttribute( 'class', 'box' );
		//this.node.appendChild( this.menu3 );
		this.menu3.appendChild( document.createTextNode( 'Datastructures' ) );
		this.menu3.appendChild( document.createElement( 'br' ) );
		this.menu3.appendChild( document.createTextNode( 'Points: ' ) );
		this.sel8 = new this.Select( this.menu3, false, 1, null, [
			[ '10', '3x10' ],
			[ '30', '3x30' ],
			[ '60', '3x60' ]
		] );
		this.menu3.appendChild( document.createElement( 'br' ) );
		var start3 =  document.createElement( 'input' );
		start3.type = 'button';
		start3.value = 'Voronoi Connectivity';
		function start3fun() {
			PAGES.SIMULATION.visualEnabled = true;
			PAGES.show( 'PAGES.SIMULATION' );
			GENERATOR.generate( 1, parseInt( self.sel8.node.value ) ).activate( 0 );
			TRIS = [];
			ALGO.DATASTRUCTURE.VoronoiConnectivity.setUp();
			PAGES.SIMULATION.update();
		}
		start3.addEventListener( 'click', start3fun, false );
		this.menu3.appendChild( start3 );*/

		this.updateDescriptions();
	},

	Select: function ( parent, multiple, defaultIndex, onChangeFunction, options ) {
		this.node = document.createElement( 'select' );
		this.node.multiple = multiple;
		parent.appendChild( this.node );
		for ( var i = 0; i < options.length; i++ ) {
			var op = document.createElement( 'option' );
			op.value = options[ i ][ 0 ];
			op.innerHTML = options[ i ][ 1 ];
			this.node.appendChild( op );
		}
		if ( !multiple ) {
			this.node.selectedIndex = defaultIndex;
		}
		if ( onChangeFunction !== null ) {
			this.node.addEventListener( 'change', onChangeFunction, false );
		}
	},

	updateDescriptions: function () {
		var d1 = ALGO.TRIANGLEBUILD[ this.sel1.node.value ];
		var d2 = ALGO.SWAPPING[ this.sel2.node.value ];
		var d3 = ALGO.OPTIMIZATIONMEASURE[ this.sel2b.node.value ];
		this.sel1des.innerHTML = '(' + d1.description + ') [' + d1.shortcut + ']';
		this.sel2des.innerHTML = '(' + d2.description + ') [' + d2.shortcut + ']';
		this.sel2bdes.innerHTML = '(' + d3.description + ') [' + d3.shortcut + ']';

		var s1 = 0;
		var o1 = this.sel6.node.options;
		for ( var i = 0; i < o1.length; i++ ) {
			if ( o1[ i ].selected ) { s1++; }
		}
		var s2 = 0;
		var o2 = this.sel7.node.options;
		for ( var i = 0; i < o2.length; i++ ) {
			if ( o2[ i ].selected ) { s2++; }
		}
		var s3 = 0;
		var o3 = this.sel8.node.options;
		for ( var i = 0; i < o3.length; i++ ) {
			if ( o3[ i ].selected ) { s3++; }
		}
		var s4 = parseInt( this.sel4.node.value );
		var ps = parseInt( this.sel5.node.value );
		this.start2help.innerHTML = '(' + (s1*s2*s3*s4) + ' passes at ' + ps + ' points)';
	}

};


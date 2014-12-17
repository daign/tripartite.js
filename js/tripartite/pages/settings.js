PAGES.SETTINGS = {

	init: function () {
		var self = this;

		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'settings';
		this.node.style.overflow = 'auto';
		document.body.appendChild( this.node );

		var onSwitch = function ( visible ) {
			if ( visible ) {
				STATISTICS.clear();
				POINTS.storeTemporary.clear();
				PAGES.INFOBOX.reset();
				PAGES.INFOSTATS.clear();
			}
		};
		PAGES.add( this.node, 'settings', onSwitch );

		var onChange = function () {
			self.updateDescriptions();
		};

		var header = document.createElement( 'div' );
		header.setAttribute( 'class', 'header' );
		header.appendChild( document.createTextNode( 'tripartite.js – Tripartite matching of points in space' ) );
		this.node.appendChild( header );

		var explanation = document.createElement( 'div' );
		explanation.setAttribute( 'class', 'explanation' );
		explanation.innerHTML = 'The task is to find connections between points from three partitions \
			so that the resulting triangles do not intersect. This project features simulations and \
			visualizations of algorithms which use optimization strategies to obtain such satisfying \
			solutions. <a href="https://github.com/daign/tripartite.js">Visit the project homepage.</a>';
		this.node.appendChild( explanation );

		// settings for visualizations
		this.menu1 = document.createElement( 'div' );
		this.menu1.setAttribute( 'class', 'box' );
		this.node.appendChild( this.menu1 );

		var menu1header = document.createElement( 'div' );
		menu1header.setAttribute( 'class', 'boxheader' );
		menu1header.innerHTML = 'Algorithm Visualizations';
		this.menu1.appendChild( menu1header );

		// points selection
		this.menu1.appendChild( document.createTextNode( 'Points: ' ) );

		// option for random point set
		var menu1pointsRadio1 = document.createElement( 'input' );
		menu1pointsRadio1.id = 'menu1pointsRadio1';
		menu1pointsRadio1.type = 'radio';
		menu1pointsRadio1.name = 'menu1points';
		menu1pointsRadio1.checked = true;
		menu1pointsRadio1.setAttribute( 'class', 'radioinput' );
		this.menu1.appendChild( menu1pointsRadio1 );
		menu1pointsRadio1.addEventListener( 'change', onChange, false );

		var menu1pointsLabel1 = document.createElement( 'label' );
		menu1pointsLabel1.innerHTML = 'random 3x30';
		menu1pointsLabel1.htmlFor = menu1pointsRadio1.id;
		this.menu1.appendChild( menu1pointsLabel1 );

		// option for custom point set
		this.menu1pointsRadio2 = document.createElement( 'input' );
		this.menu1pointsRadio2.id = 'menu1pointsRadio2';
		this.menu1pointsRadio2.type = 'radio';
		this.menu1pointsRadio2.name = 'menu1points';
		this.menu1pointsRadio2.setAttribute( 'class', 'radioinput' );
		this.menu1.appendChild( this.menu1pointsRadio2 );
		this.menu1pointsRadio2.addEventListener( 'change', onChange, false );

		this.menu1pointsLabel2 = document.createElement( 'label' );
		this.menu1pointsLabel2.innerHTML = 'custom (none selected)';
		this.menu1pointsLabel2.htmlFor = this.menu1pointsRadio2.id;
		this.menu1.appendChild( this.menu1pointsLabel2 );

		// editor button single mode
		var menu1editorButton = document.createElement( 'input' );
		menu1editorButton.type = 'button';
		menu1editorButton.value = 'Editor';
		menu1editorButton.style.marginLeft = '10px';
		var menu1startEditor = function () {
			EDITOR.setList.setSelectMode( 'single' );
			PAGES.show( 'editor' );
		};
		menu1editorButton.addEventListener( 'click', menu1startEditor, false );
		this.menu1.appendChild( menu1editorButton );

		// triangle build algorithm
		this.menu1.appendChild( document.createElement( 'br' ) );
		this.menu1.appendChild( document.createTextNode( 'Triangle Build: ' ) );
		this.sel1 = new PAGES.SELECT( this.menu1, false, 3, onChange, [
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
		this.sel2 = new PAGES.SELECT( this.menu1, false, 2, onChange, [
			[ 'strategySwapRandom',                 'Strategy Swap Random' ],
			[ 'strategySwapIntersecting',           'Strategy Swap Intersecting' ],
			[ 'strategySwapIntersectingBFS',        'Strategy Swap Intersecting BFS' ],
			[ 'strategySwapIntersectingPartnerBFS', 'Strategy Swap Intersecting Partner BFS' ],
			[ 'bestFirstRandomNeighbors',           'Best First Search Random Neighbors' ],
			[ 'bestFirstIntersectingNeighbors',     'Best First Search Intersecting Neighbors' ],
			[ 'randomSwap',                         'Random' ],
			[ 'none',                               'None' ]
		] );
		this.menu1.appendChild( document.createTextNode( '   ' ) );
		this.sel2des = document.createElement( 'span' );
		this.sel2des.setAttribute( 'class', 'description' );
		this.menu1.appendChild( this.sel2des );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// optimization measure
		this.menu1.appendChild( document.createTextNode( 'Optimization Measure: ' ) );
		this.sel2b = new PAGES.SELECT( this.menu1, false, 1, onChange, [
			[ 'intersections',                 'Intersections' ],
			[ 'intersectionsAndArea',          'Intersections and Area' ],
			[ 'intersectionsAndLongestEdges',  'Intersections and Longest Edges' ],
			[ 'intersectionsAndMaximumAngles', 'Intersections and Maximum Angles' ],
			[ 'intersectionsAndMinimumAngles', 'Intersections and Inverse Minimum Angles' ],
		//  [ 'area',                          'Area' ],
			[ 'longestEdges',                  'Longest Edges' ]
		] );
		this.menu1.appendChild( document.createTextNode( '   ' ) );
		this.sel2bdes = document.createElement( 'span' );
		this.sel2bdes.setAttribute( 'class', 'description' );
		this.menu1.appendChild( this.sel2bdes );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// speed
		this.menu1.appendChild( document.createTextNode( 'Speed: ' ) );
		this.sel3 = new PAGES.SELECT( this.menu1, false, 1, null, [
			[ '500', 'Slow'     ],
			[ '100', 'Moderate' ],
			[ '50',  'Fast'     ],
			[ '1',   'Fastest'  ]
		] );
		this.menu1.appendChild( document.createElement( 'br' ) );

		// start button
		this.start1 = document.createElement( 'input' );
		this.start1.type = 'button';
		this.start1.value = 'Start';
		function start1fun() {

			var triangleBuildFunction = self.sel1.get();
			var swappingFunction = self.sel2.get();
			var optimizationFunction = self.sel2b.get();

			var iterations = undefined;
			if ( self.menu1pointsRadio2.checked ) {
				POINTS.useTemporary = false;
				iterations = POINTS.storePermanent.getNumberOfSelected( 'singleSelected' );
			} else {
				POINTS.useTemporary = true;
				iterations = 1;
			}

			if ( iterations === 0 ) { return; }

			PAGES.SIMULATION.setEnabled( { visual: true, progressDiagram: true } );
			PAGES.show( 'simulation' );
			TIMECONTROL.setSpeed( parseInt( self.sel3.get() ) ).setPaused( false );

			PAGES.INFOBOX.setSetUp( STATISTICS.startNewSetUp( triangleBuildFunction, swappingFunction, optimizationFunction ) );
			PAGES.INFOSTATS.setRecord( STATISTICS.startNewRecord() );

			POINTS.activate( 0, 'singleSelected' );

			function onFinish() {
				PAGES.INFOBOX.setPhase( 'finished' );
			}
			ALGORITHMS.run( triangleBuildFunction, swappingFunction, optimizationFunction, onFinish );
		}
		this.start1.addEventListener( 'click', start1fun, false );
		this.menu1.appendChild( this.start1 );


		// settings for comparisons
		this.menu2 = document.createElement( 'div' );
		this.menu2.setAttribute( 'class', 'box' );
		this.node.appendChild( this.menu2 );

		var menu2header = document.createElement( 'div' );
		menu2header.setAttribute( 'class', 'boxheader' );
		menu2header.innerHTML = 'Algorithm Comparisons';
		this.menu2.appendChild( menu2header );

		// points selection
		this.menu2.appendChild( document.createTextNode( 'Points: ' ) );

		// option for random point sets
		var menu2pointsRadio1 = document.createElement( 'input' );
		menu2pointsRadio1.id = 'menu2pointsRadio1';
		menu2pointsRadio1.type = 'radio';
		menu2pointsRadio1.name = 'menu2points';
		menu2pointsRadio1.checked = true;
		menu2pointsRadio1.setAttribute( 'class', 'radioinput' );
		this.menu2.appendChild( menu2pointsRadio1 );
		menu2pointsRadio1.addEventListener( 'change', onChange, false );

		var menu2pointsLabel1 = document.createElement( 'label' );
		menu2pointsLabel1.innerHTML = 'random 5x(3x30)';
		menu2pointsLabel1.htmlFor = menu2pointsRadio1.id;
		this.menu2.appendChild( menu2pointsLabel1 );

		// option for custom point sets
		this.menu2pointsRadio2 = document.createElement( 'input' );
		this.menu2pointsRadio2.id = 'menu2pointsRadio2';
		this.menu2pointsRadio2.type = 'radio';
		this.menu2pointsRadio2.name = 'menu2points';
		this.menu2pointsRadio2.setAttribute( 'class', 'radioinput' );
		this.menu2.appendChild( this.menu2pointsRadio2 );
		this.menu2pointsRadio2.addEventListener( 'change', onChange, false );

		this.menu2pointsLabel2 = document.createElement( 'label' );
		this.menu2pointsLabel2.innerHTML = 'custom (none selected)';
		this.menu2pointsLabel2.htmlFor = this.menu2pointsRadio2.id;
		this.menu2.appendChild( this.menu2pointsLabel2 );

		// editor button multiple mode
		var menu2editorButton = document.createElement( 'input' );
		menu2editorButton.type = 'button';
		menu2editorButton.value = 'Editor';
		menu2editorButton.style.marginLeft = '10px';
		var menu2startEditor = function () {
			EDITOR.setList.setSelectMode( 'multiple' );
			PAGES.show( 'editor' );
		};
		menu2editorButton.addEventListener( 'click', menu2startEditor, false );
		this.menu2.appendChild( menu2editorButton );

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
		this.sel6 = new PAGES.SELECT( td2, true, 0, onChange, [
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
		this.sel7 = new PAGES.SELECT( td4, true, 0, onChange, [
			[ 'strategySwapRandom',                 'Strategy Swap Random' ],
			[ 'strategySwapIntersecting',           'Strategy Swap Intersecting' ],
			[ 'strategySwapIntersectingBFS',        'Strategy Swap Intersecting BFS' ],
			[ 'strategySwapIntersectingPartnerBFS', 'Strategy Swap Intersecting Partner BFS' ],
		//  [ 'bestFirstRandomNeighbors',           'Best First Search Random Neighbors' ],
			[ 'bestFirstIntersectingNeighbors',     'Best First Search Intersecting Neighbors' ]
		] );
		this.sel7.node.style.height = '100px';

		// optimization measure
		var td5 = document.createElement( 'td' );
		tr1.appendChild( td5 );
		td5.appendChild( document.createTextNode( 'Optimization Measure: ' ) );
		var td6 = document.createElement( 'td' );
		tr1.appendChild( td6 );
		this.sel8 = new PAGES.SELECT( td6, true, 0, onChange, [
			[ 'intersections',                 'Intersections' ],
			[ 'intersectionsAndArea',          'Intersections and Area' ],
			[ 'intersectionsAndLongestEdges',  'Intersections and Longest Edges' ],
			[ 'intersectionsAndMaximumAngles', 'Intersections and Maximum Angles' ],
			[ 'intersectionsAndMinimumAngles', 'Intersections and Inverse Minimum Angles' ]
		] );
		this.sel8.node.style.height = '100px';

		// start button
		this.start2 = document.createElement( 'input' );
		this.start2.type = 'button';
		this.start2.value = 'Start';
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

			var iterations = undefined;
			if ( self.menu2pointsRadio2.checked ) {
				POINTS.useTemporary = false;
				iterations = POINTS.storePermanent.getNumberOfSelected( 'multipleSelected' );
			} else {
				POINTS.useTemporary = true;
				iterations = 5;
			}

			if (
				   triangleBuildAlgos.length === 0
				|| swappingAlgos.length === 0
				|| optimizationAlgos.length === 0
				|| iterations === 0
			) { return; }

			PAGES.SIMULATION.setEnabled( { visual: false, progressDiagram: false } );
			PAGES.show( 'simulation' );
			TIMECONTROL.setSpeed( 1 ).setPaused( false );

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
								PAGES.INFOBOX.setPhase( 'finished' );
								PAGES.show( 'results' );
								return;
							}
						}
					}
					PAGES.INFOBOX.setSetUp(
						STATISTICS.startNewSetUp( triangleBuildAlgos[ tbi ], swappingAlgos[ swi ], optimizationAlgos[ omi ] )
					);
				}
				POINTS.activate( psi, 'multipleSelected' );
				ai++;

				PAGES.INFOSTATS.setRecord( STATISTICS.startNewRecord() );
				PAGES.INFOBOX.setPass( ai + ' of ' + al );
				ALGORITHMS.run( triangleBuildAlgos[ tbi ], swappingAlgos[ swi ], optimizationAlgos[ omi ], doNext );
			}
			doNext();

		}
		this.start2.addEventListener( 'click', start2fun, false );
		this.menu2.appendChild( this.start2 );
		this.menu2.appendChild( document.createTextNode( '   ' ) );
		this.start2help = document.createElement( 'span' );
		this.start2help.setAttribute( 'class', 'description' );
		this.menu2.appendChild( this.start2help );

		this.updateDescriptions();
	},

	updateDescriptions: function () {
		var d1 = ALGORITHMS.TRIANGLEBUILD[ this.sel1.get() ];
		var d2 = ALGORITHMS.SWAPPING[ this.sel2.get() ];
		var d3 = ALGORITHMS.OPTIMIZATIONMEASURE[ this.sel2b.get() ];
		this.sel1des.innerHTML = '(' + d1.description + ') [' + d1.shortcut + ']';
		this.sel2des.innerHTML = '(' + d2.description + ') [' + d2.shortcut + ']';
		this.sel2bdes.innerHTML = '(' + d3.description + ') [' + d3.shortcut + ']';

		if (
			   this.menu1pointsRadio2.checked
			&& POINTS.storePermanent.getNumberOfSelected( 'singleSelected' ) === 0
		) {
			this.start1.disabled = true;
		} else {
			this.start1.disabled = false;
		}

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

		var iterations = 5;
		if ( this.menu2pointsRadio2.checked ) {
			iterations = POINTS.storePermanent.getNumberOfSelected( 'multipleSelected' );
		}

		var passes = s1 * s2 * s3 * iterations;
		if ( passes === 0 ) {
			this.start2.disabled = true;
			this.start2help.innerHTML = '(0 passes) Please select at least one of each!';
		} else {
			this.start2.disabled = false;
			this.start2help.innerHTML = '(' + passes + ' passes)';
		}

	}

};


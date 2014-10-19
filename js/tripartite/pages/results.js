PAGES.RESULTS = {

	plot: undefined,
	data: undefined,
	colors: {
		background: '#124',
		scale: '#147',
		scaletext: '#59c',
		grid: '#235',
		lines: '#147',
		median: '#36a',
		mean: '#59c'
	},

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'results';
		document.body.appendChild( this.node );

		var onSwitch = function ( r ) {
			if ( r ) {
				PAGES.RESULTS.showGraphs();
			}
		};
		PAGES.add( this.node, 'results', onSwitch );

		this.box = document.createElement( 'div' );
		this.box.setAttribute( 'class', 'box absolute' );
		this.node.appendChild( this.box );

		var self = this;

		var home = document.createElement( 'input' );
		home.type = 'button';
		home.value = 'home';
		var goHome = function () {
			PAGES.show( 'settings' );
		};
		home.addEventListener( 'click', goHome, false );
		this.box.appendChild( home );

		var graph1 = document.createElement( 'input' );
		graph1.id = 'graph1radio';
		graph1.type = 'radio';
		graph1.name = 'graphSwitch';
		graph1.checked = true;
		graph1.setAttribute( 'class', 'radioinput' );
		this.box.appendChild( graph1 );
		var graph1Label = document.createElement( 'label' );
		graph1Label.innerHTML = 'swaps';
		graph1Label.htmlFor = graph1.id;
		this.box.appendChild( graph1Label );

		var graph2 = document.createElement( 'input' );
		graph2.id = 'graph2radio';
		graph2.type = 'radio';
		graph2.name = 'graphSwitch';
		graph2.setAttribute( 'class', 'radioinput' );
		this.box.appendChild( graph2 );
		var graph2Label = document.createElement( 'label' );
		graph2Label.innerHTML = 'testswaps';
		graph2Label.htmlFor = graph2.id;
		this.box.appendChild( graph2Label );

		var graph3 = document.createElement( 'input' );
		graph3.id = 'graph3radio';
		graph3.type = 'radio';
		graph3.name = 'graphSwitch';
		graph3.setAttribute( 'class', 'radioinput' );
		this.box.appendChild( graph3 );
		var graph3Label = document.createElement( 'label' );
		graph3Label.innerHTML = 'swaps + testswaps';
		graph3Label.htmlFor = graph3.id;
		this.box.appendChild( graph3Label );

		var graph4 = document.createElement( 'input' );
		graph4.id = 'graph4radio';
		graph4.type = 'radio';
		graph4.name = 'graphSwitch';
		graph4.setAttribute( 'class', 'radioinput' );
		this.box.appendChild( graph4 );
		var graph4Label = document.createElement( 'label' );
		graph4Label.innerHTML = 'intersectiontests';
		graph4Label.htmlFor = graph4.id;
		this.box.appendChild( graph4Label );

		var onGraphSwitch = function () {
			if ( graph1.checked ) {
				self.plot.setData( self.data.swaps );
			} else if ( graph2.checked ) {
				self.plot.setData( self.data.testswaps );
			} else if ( graph3.checked ) {
				self.plot.setData( self.data.allswaps );
			} else if ( graph4.checked ) {
				self.plot.setData( self.data.intersectiontests );
			}
		};

		graph1.addEventListener( 'change', onGraphSwitch, false );
		graph2.addEventListener( 'change', onGraphSwitch, false );
		graph3.addEventListener( 'change', onGraphSwitch, false );
		graph4.addEventListener( 'change', onGraphSwitch, false );

		this.box.appendChild( document.createElement( 'br' ) );

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = window.innerWidth - 64;
		this.canvas.height = 400;
		this.box.appendChild( this.canvas );

	},

	showGraphs: function () {

		var returnArray = STATISTICS.getData();
		this.data = returnArray.data;
		var labels = returnArray.labels;

		this.plot = new TRIPLOT( this.canvas, labels, this.data.swaps, this.colors );

	}

};


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
		function goHome() { PAGES.show( 'settings' ); }
		home.addEventListener( 'click', goHome, false );
		this.box.appendChild( home );

		var graph1 = document.createElement( 'input' );
		graph1.type = 'button';
		graph1.value = 'Swaps';
		function showGraph1() { self.plot.setData( self.data.swaps ); }
		graph1.addEventListener( 'click', showGraph1, false );
		this.box.appendChild( graph1 );

		var graph2 = document.createElement( 'input' );
		graph2.type = 'button';
		graph2.value = 'Testswaps';
		function showGraph2() { self.plot.setData( self.data.testswaps ); }
		graph2.addEventListener( 'click', showGraph2, false );
		this.box.appendChild( graph2 );

		var graph3 = document.createElement( 'input' );
		graph3.type = 'button';
		graph3.value = 'Swaps + Testswaps';
		function showGraph3() { self.plot.setData( self.data.allswaps ); }
		graph3.addEventListener( 'click', showGraph3, false );
		this.box.appendChild( graph3 );

		var graph4 = document.createElement( 'input' );
		graph4.type = 'button';
		graph4.value = 'Intersectiontests';
		function showGraph4() { self.plot.setData( self.data.intersectiontests ); }
		graph4.addEventListener( 'click', showGraph4, false );
		this.box.appendChild( graph4 );

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


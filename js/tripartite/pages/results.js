PAGES.RESULTS = {

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
	},

	showGraphs: function () {

		var myplot = undefined;
		var colors = {
			background: '#124',
			scale: '#147',
			scaletext: '#59c',
			grid: '#235',
			lines: '#147',
			median: '#36a',
			mean: '#59c'
		};
		var returnArray = STATISTICS.getData();
		var data = returnArray.data;
		var labels = returnArray.labels;

		var graph1 = document.createElement( 'input' );
		graph1.type = 'button';
		graph1.value = 'Swaps';
		function showGraph1() { myplot.setData( data.swaps ); }
		graph1.addEventListener( 'click', showGraph1, false );
		this.box.appendChild( graph1 );

		var graph2 = document.createElement( 'input' );
		graph2.type = 'button';
		graph2.value = 'Testswaps';
		function showGraph2() { myplot.setData( data.testswaps ); }
		graph2.addEventListener( 'click', showGraph2, false );
		this.box.appendChild( graph2 );

		var graph3 = document.createElement( 'input' );
		graph3.type = 'button';
		graph3.value = 'Swaps + Testswaps';
		function showGraph3() { myplot.setData( data.allswaps ); }
		graph3.addEventListener( 'click', showGraph3, false );
		this.box.appendChild( graph3 );

		var graph4 = document.createElement( 'input' );
		graph4.type = 'button';
		graph4.value = 'Intersectiontests';
		function showGraph4() { myplot.setData( data.intersectiontests ); }
		graph4.addEventListener( 'click', showGraph4, false );
		this.box.appendChild( graph4 );

		this.box.appendChild( document.createElement( 'br' ) );

		var canvas = document.createElement( 'canvas' );
		canvas.width = window.innerWidth - 64;
		canvas.height = 400;
		this.box.appendChild( canvas );

		myplot = new TRIPLOT( canvas, labels, data.swaps, colors );

	}

};


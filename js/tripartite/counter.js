var COUNTER = {

	open: true,
	allowToggle: true,

	pass: undefined,
	phase: undefined,
	setUp: undefined,
	record: undefined,

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'box counter' );
		SIMULATION.node.appendChild( this.node );

		var self = this;
		function onClick() {
			self.toggle();
		}
		this.node.addEventListener( 'click', onClick, false );
	},

	update: function () {
		if ( this.open ) {
			this.node.innerHTML = (
				  ( ( this.pass !== undefined ) ? 'pass: ' + this.pass + '<br>' : '' )
				+ 'algorithm: ' + this.setUp + '<br>'
				+ 'phase: ' + this.phase + '<hr>'
				+ 'intersections: ' + SIMULATION.QUALITY.countAllIntersections( false ) + '<br>'
				+ 'area: ' + Math.round( SIMULATION.QUALITY.countAllAreas() ) + '<br>'
				+ 'longest edges: ' + Math.round( SIMULATION.QUALITY.countAllLongestEdges() ) + '<hr>'
				+ 'swaps: ' + this.record.swaps + '<br>'
				+ 'testswaps: ' + this.record.testswaps + '<br>'
				+ 'intersectiontests: ' + this.record.intersectiontests
			);
		} else {
			this.node.innerHTML = '+';
		}
	},

	setPass: function ( p ) {
		this.pass = p;
	},
	setPhase: function ( p ) {
		this.phase = p;
		return this;
	},
	setSetUp: function ( l ) {
		this.setUp = l;
	},
	setRecord: function ( r ) {
		this.record = r;
	},

	toggle: function () {
		if ( this.allowToggle ) {
			this.open = !this.open;
			this.update();
		}
	},

	showGraphs: function () {
		this.allowToggle = false;

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

		this.node.innerHTML = '';

		var graph1 = document.createElement( 'input' );
		graph1.type = 'button';
		graph1.value = 'Swaps';
		function showGraph1() { myplot.setData( data.swaps ); }
		graph1.addEventListener( 'click', showGraph1, false );
		this.node.appendChild( graph1 );

		var graph2 = document.createElement( 'input' );
		graph2.type = 'button';
		graph2.value = 'Testswaps';
		function showGraph2() { myplot.setData( data.testswaps ); }
		graph2.addEventListener( 'click', showGraph2, false );
		this.node.appendChild( graph2 );

		var graph3 = document.createElement( 'input' );
		graph3.type = 'button';
		graph3.value = 'Swaps + Testswaps';
		function showGraph3() { myplot.setData( data.allswaps ); }
		graph3.addEventListener( 'click', showGraph3, false );
		this.node.appendChild( graph3 );

		var graph4 = document.createElement( 'input' );
		graph4.type = 'button';
		graph4.value = 'Intersectiontests';
		function showGraph4() { myplot.setData( data.intersectiontests ); }
		graph4.addEventListener( 'click', showGraph4, false );
		this.node.appendChild( graph4 );

		this.node.appendChild( document.createElement( 'br' ) );

		var canvas = document.createElement( 'canvas' );
		canvas.width = window.innerWidth - 64;
		canvas.height = 400;
		this.node.appendChild( canvas );

		myplot = new TRIPLOT( canvas, labels, data.swaps, colors );

	}

};


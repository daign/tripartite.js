PAGES.INFOBOX = {

	open: true,

	pass: undefined,
	phase: undefined,
	setUp: undefined,
	record: undefined,

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'box absolute' );
		PAGES.SIMULATION.node.appendChild( this.node );

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
				+ 'intersections: ' + COUNTING.countAllIntersections( false ) + '<br>'
				+ 'area: ' + Math.round( COUNTING.countAllAreas() ) + '<br>'
				+ 'longest edges: ' + Math.round( COUNTING.countAllLongestEdges() ) + '<hr>'
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
		this.open = !this.open;
		this.update();
	}

};


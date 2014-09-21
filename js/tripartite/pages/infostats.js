PAGES.INFOSTATS = {

	record: undefined,

	setRecord: function ( r ) {
		this.record = r;
	},

	init: function ( node ) {
		this.node = node;

		/*this.statsCanvas = document.createElement( 'canvas' );
		this.node.appendChild( this.statsCanvas );*/

		this.statsDiv = document.createElement( 'div' );
		this.node.appendChild( this.statsDiv );
	},

	update: function () {
		this.statsDiv.innerHTML = (
			  '<hr>'
			+ 'intersections: ' + COUNTING.countAllIntersections( false ) + '<br>'
			+ 'area: ' + Math.round( COUNTING.countAllAreas() ) + '<br>'
			+ 'longest edges: ' + Math.round( COUNTING.countAllLongestEdges() ) + '<hr>'
			+ 'swaps: ' + this.record.swaps + '<br>'
			+ 'testswaps: ' + this.record.testswaps + '<br>'
			+ 'intersectiontests: ' + this.record.intersectiontests
		);
	}

};


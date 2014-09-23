PAGES.INFOSTATS = {

	data:   undefined,
	record: undefined,

	ctx: undefined,
	canvasWidth: 300,
	canvasHeight: 100,

	setRecord: function ( r ) {

		this.record = r;
		this.clear();

	},

	init: function ( node ) {

		this.node = node;

		var self = this;

		this.data = {
			intersections:     { max: 0, values: [], get: function () { return COUNTING.countAllIntersections( false ); } },
			area:              { max: 0, values: [], get: function () { return COUNTING.countAllAreas(); } },
			longestEdges:      { max: 0, values: [], get: function () { return COUNTING.countAllLongestEdges(); } },
			maximumAngles:     { max: 0, values: [], get: function () { return COUNTING.countAllMaximumAngles(); } },
			minimumAngles:     { max: 0, values: [], get: function () { return COUNTING.countAllMinimumAngles(); } },
			swaps:             { max: 0, values: [], get: function () { return self.record.swaps; } },
			testswaps:         { max: 0, values: [], get: function () { return self.record.testswaps; } },
			allswaps:          { max: 0, values: [], get: function () { return self.record.allswaps; } },
			intersectiontests: { max: 0, values: [], get: function () { return self.record.intersectiontests; } }
		};

		this.node.appendChild( document.createElement( 'hr' ) );

		this.statsCanvas = document.createElement( 'canvas' );
		this.statsCanvas.width = this.canvasWidth;
		this.statsCanvas.height = this.canvasHeight;
		this.node.appendChild( this.statsCanvas );
		this.ctx = this.statsCanvas.getContext( '2d' );

		this.statsDiv = document.createElement( 'div' );
		this.node.appendChild( this.statsDiv );

	},

	clear: function () {

		for ( var x in this.data ) {
			this.data[ x ].max = 0;
			this.data[ x ].values = [];
		}

	},

	update: function () {

		for ( var x in this.data ) {
			var v = this.data[ x ].get();
			this.data[ x ].values.push( v );
			if ( v > this.data[ x ].max ) {
				this.data[ x ].max = v;
			}
		}

		this.updateText();
		this.updateChart();

	},

	updateText: function () {

		var self = this;

		var getLast = function ( id ) {
			return self.data[ id ].values[ self.data[ id ].values.length-1 ];
		};

		this.statsDiv.innerHTML = (
			  'intersections: '     + getLast( 'intersections'     ) + '<br>'
			+ 'swaps: '             + getLast( 'swaps'             ) + '<br>'
			+ 'testswaps: '         + getLast( 'testswaps'         ) + '<br>'
			+ 'intersectiontests: ' + getLast( 'intersectiontests' )
		);

	},

	updateChart: function () {

		var self = this;
		var ctx = this.ctx;
		var width = this.canvasWidth;
		var height = this.canvasHeight;

		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.clearRect( 0, 0, width, height );
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#ffffff';

		var drawDataLine = function ( dataId ) {

			var max = self.data[ dataId ].max;
			var length = self.data[ dataId ].values.length;

			ctx.beginPath();
			ctx.moveTo( 0, height - self.data[ dataId ].values[ 0 ] * height / max );

			for ( var i = 1; i < length; i++ ) {
				ctx.lineTo( i * width / ( length - 1 ) , height - self.data[ dataId ].values[ i ] * height / max );
			}

			ctx.stroke();
			ctx.closePath();

		};

		drawDataLine( 'intersections' );
		drawDataLine( 'intersectiontests' );

	}

};


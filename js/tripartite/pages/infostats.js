PAGES.INFOSTATS = {

	data:   undefined,
	record: undefined,
	phaseChange: undefined,

	ctx: undefined,
	canvasWidth: 300,
	canvasHeight: 100,

	secondValue: 'intersectiontests',

	setRecord: function ( r ) {

		this.record = r;
		this.clear();

	},

	setPhaseChange: function () {

		this.phaseChange = this.data.intersections.values.length - 1;

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
			allswaps:          { max: 0, values: [], get: function () { return self.record.swaps + self.record.testswaps; } },
			intersectiontests: { max: 0, values: [], get: function () { return self.record.intersectiontests; } }
		};

		this.node.appendChild( document.createElement( 'hr' ) );

		this.statsCanvas = document.createElement( 'canvas' );
		this.statsCanvas.width = this.canvasWidth;
		this.statsCanvas.height = this.canvasHeight;
		this.node.appendChild( this.statsCanvas );
		this.ctx = this.statsCanvas.getContext( '2d' );

		this.statsDiv1 = document.createElement( 'div' );
		this.node.appendChild( this.statsDiv1 );

		var selectText = document.createElement( 'span' );
		selectText.innerHTML = 'second value: ';
		selectText.style.color = '#36a';
		this.node.appendChild( selectText );

		var onSelect = function ( event ) {
			self.secondValue = self.select.get();
			self.updateChart();
		};
		this.select = new PAGES.SELECT( this.node, false, 7, onSelect, [
			[ 'area',              'area' ],
			[ 'longestEdges',      'longest edges' ],
			[ 'maximumAngles',     'maximum angles' ],
			[ 'minimumAngles',     'minimum angles' ],
			[ 'swaps',             'swaps' ],
			[ 'testswaps',         'testswaps' ],
			[ 'allswaps',          'swaps + testswaps' ],
			[ 'intersectiontests', 'intersectiontests' ]
		] );

		this.statsDiv2 = document.createElement( 'div' );
		this.statsDiv2.style.color = '#36a';
		this.node.appendChild( this.statsDiv2 );

	},

	clear: function () {

		for ( var x in this.data ) {
			this.data[ x ].max = 0;
			this.data[ x ].values = [];
		}

		this.phaseChange = undefined;

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

		this.statsDiv1.innerHTML = (
			  'intersections: '     + getLast( 'intersections'     )
		);
		this.statsDiv2.innerHTML = (
			  '<hr>'
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

		ctx.beginPath();
		ctx.rect( 0, 0, width, height );
		ctx.fillStyle = '#235';
		ctx.fill();
		ctx.closePath();

		ctx.lineWidth = 2;
		ctx.lineCap = 'round';

		if ( this.phaseChange !== undefined ) {

			ctx.strokeStyle = '#124';
			ctx.beginPath();
			var length = self.data.intersections.values.length;
			var	x = 5 + this.phaseChange * ( width - 10 ) / ( length - 1 );
			ctx.moveTo( x, 0 );
			ctx.lineTo( x, height );
			ctx.stroke();
			ctx.closePath();

		}

		var drawDataLine = function ( dataId, color ) {

			var max = self.data[ dataId ].max;
			max = ( max === 0 ? 1 : max );
			var length = self.data[ dataId ].values.length;

			ctx.strokeStyle = color;
			ctx.beginPath();
			var x = 5;
			var y = height - 5 - self.data[ dataId ].values[ 0 ] * ( height - 10 ) / max;
			ctx.moveTo( x, y );

			for ( var i = 1; i < length; i++ ) {
				x = 5 + i * ( width - 10 ) / ( length - 1 );
				y = height - 5 - self.data[ dataId ].values[ i ] * ( height - 10 ) / max;
				ctx.lineTo( x, y );
			}

			ctx.stroke();
			ctx.closePath();

		};

		drawDataLine( this.secondValue, '#36a' );
		drawDataLine( 'intersections',  '#59c' );

	}

};


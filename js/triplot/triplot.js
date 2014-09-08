var TRIPLOT = function ( canvas, labels, data, colors ) {

	this.canvas = canvas;
	this.labels = labels;
	this.data = data;
	this.colors = colors;

	this.allmax = undefined;
	this.statistics = [];

	this.calculate();
	this.draw();

};


TRIPLOT.prototype = {

	constructor: TRIPLOT,

	setData: function ( data ) {
		this.data = data;
		this.calculate();
		this.draw();
	},

	calculate: function () {
		this.statistics = [];
		this.allmax = -Infinity;
		for ( var i = 0; i < this.data.length; i++ ) {
			var len = this.data[ i ].length;
			var sum = 0;
			var min = Infinity;
			var max = -Infinity;
			for ( var j = 0; j < len; j++ ) {
				var v = this.data[ i ][ j ];
				sum += v;
				if ( v < min ) { min = v; }
				if ( v > max ) { max = v; }
				if ( v > this.allmax ) { this.allmax = v; }
			}
			var mean = sum / len;
			this.data[ i ].sort( function ( a, b ) { return a-b; } );
			var median = undefined;
			var q1 = undefined;
			var q3 = undefined;
			if ( len % 2 === 0 ) {
				median = ( this.data[ i ][ len / 2 ] + this.data[ i ][ len / 2 - 1 ] ) / 2;
				if ( len % 4 === 0 ) {
					q1 = ( this.data[ i ][ len*0.25 ] + this.data[ i ][ len*0.25 - 1 ] ) / 2;
					q3 = ( this.data[ i ][ len*0.75 ] + this.data[ i ][ len*0.75 - 1 ] ) / 2;
				} else {
					q1 = this.data[ i ][ (len/2-1) / 2 ];
					q3 = this.data[ i ][ len/2 + (len/2-1) / 2 ];
				}
			} else {
				median = this.data[ i ][ (len-1) / 2 ];
				if ( (len-1) % 4 === 0 ) { // (4n+1)
					var n = (len-1)/4;
					if ( n > 0 ) {
						console.log( n );
						q1 = 0.25 * this.data[ i ][ n-1 ] + 0.75 * this.data[ i ][ n ];
						q3 = 0.75 * this.data[ i ][ 3*n ] + 0.25 * this.data[ i ][ 3*n+1 ];
					} else {
						q1 = undefined;
						q3 = undefined;
					}
				} else { // (4n+3)
					var n = (len-3)/4;
					q1 = 0.75 * this.data[ i ][ n ] + 0.25 * this.data[ i ][ n+1 ];
					q3 = 0.25 * (this.data[ i ][ 3*n+1 ]) + 0.75 * (this.data[ i ][ 3*n+2 ]);
				}
			}
			this.statistics.push( { min: min, max: max, mean: mean, median: median, q1: q1, q3: q3 } );
		}
	},

	draw: function () {
		var ctx = this.canvas.getContext( '2d' );
		var w = this.canvas.width;
		var h = this.canvas.height;

		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.clearRect( 0, 0, w, h );

		ctx.beginPath();
		ctx.rect( 0, 0, w, h );
		ctx.fillStyle = this.colors.background;
		ctx.fill();

		var dw = Math.round( w * 0.92 );
		var dh = Math.round( h * 0.88 );
		var dx = Math.round( w * 0.07 );
		var dy = Math.round( h * 0.04 );

		ctx.translate( dx, dy );

		var self = this;
		var convert = function ( v ) {
			return ( -v * dh / self.allmax + dh );
		}

		var tick = w * 0.007;
		var grid = this.calculateGridSize( this.allmax );
		ctx.strokeStyle = this.colors.grid;
		ctx.lineWidth = 2;
		ctx.fillStyle = this.colors.scaletext;
		ctx.font = h*0.04 + 'px sans-serif';
		ctx.textAlign = 'right';
		ctx.beginPath();
		var y = 0;
		while ( y <= this.allmax ) {
			ctx.moveTo( -tick, convert( y ) );
			ctx.lineTo( dw, convert( y ) );
			ctx.fillText( y, -tick*1.6, convert( y )+h*0.01 );
			y += grid;
		}
		ctx.stroke();

		ctx.strokeStyle = this.colors.scale;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo( 0, 0 );
		ctx.lineTo( 0, dh );
		ctx.stroke();

		var len = this.labels.length;
		var blc = dw / len;
		var end = blc * 0.2;
		var dot = blc * 0.08;
		for ( var i = 0; i < len; i++ ) {

			var x0 = i * blc;
			ctx.strokeStyle = this.colors.scale;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo( x0, dh );
			ctx.lineTo(	x0, dh+tick );
			ctx.stroke();

			var x = ( i + 0.5 ) * blc;
			var min = convert( this.statistics[ i ].min );
			var max = convert( this.statistics[ i ].max );
			var mean = convert( this.statistics[ i ].mean );
			var median = convert( this.statistics[ i ].median );
			var q1 = convert( this.statistics[ i ].q1 );
			var q3 = convert( this.statistics[ i ].q3 );

			ctx.strokeStyle = this.colors.lines;
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo( x - end, min );
			ctx.lineTo(	x + end, min );
			ctx.moveTo( x, min );
			ctx.lineTo(	x, max );
			ctx.moveTo( x - end, max );
			ctx.lineTo(	x + end, max );
			ctx.stroke();

			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo( x - end, q1 );
			ctx.lineTo(	x + end, q1 );
			ctx.lineTo(	x + end, q3 );
			ctx.lineTo(	x - end, q3 );
			ctx.lineTo(	x - end, q1 );
			ctx.closePath();
			ctx.stroke();

			ctx.strokeStyle = this.colors.median;
			ctx.lineWidth = 6;
			ctx.beginPath();
			ctx.moveTo( x - end, median );
			ctx.lineTo(	x + end, median );
			ctx.stroke();

			ctx.fillStyle = this.colors.mean;
			ctx.beginPath();
			ctx.arc( x, mean, dot, 0, 2*Math.PI, false );
			ctx.fill();

			ctx.fillStyle = this.colors.mean;
			ctx.font = h*0.03 + 'px sans-serif';
			ctx.textAlign = 'left';
			ctx.fillText( Math.round( this.statistics[ i ].mean * 10 ) / 10, x+dot, mean-dot );

			ctx.fillStyle = this.colors.scaletext;
			ctx.font = h*0.04 + 'px sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText( this.labels[ i ], x, dh+h*0.05 );
		}
	},

	calculateGridSize: function ( x ) {
		var getPowerOfTen = function ( x ) {
			var n = 0;
			while ( x >= 10 ) {
				x = x / 10;
				n++;
			}
			return n;
		};

		var n = getPowerOfTen( x );
		var a = x / Math.pow( 10, n );
		if ( a < 2 ) {
			var b = 0.2;
		} else if ( a < 5 ) {
			var b = 0.5;
		} else {
			var b = 1;
		}
		return b * Math.pow( 10, n );
	}

};


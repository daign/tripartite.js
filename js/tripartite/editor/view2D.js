EDITOR.View2D = function ( node, direction ) {

	this.direction = direction;

	this.node = node;
	this.node.setAttribute( 'class', 'viewNode' );

	this.NS = 'http://www.w3.org/2000/svg';
	this.context = document.createElementNS( this.NS, 'svg' );
	this.context.setAttribute( 'viewBox', '0,0,100,100' );
	this.node.appendChild( this.context );

	this.group = document.createElementNS( this.NS, 'g' );
	this.context.appendChild( this.group );

	this.points = [ [], [], [] ];
	this.colors = [ '#cc0000', '#ffcc00', '#006600' ];

	var viewCaption = document.createElement( 'div' );
	viewCaption.setAttribute( 'class', 'viewCaption' );
	viewCaption.innerHTML = direction;
	this.node.appendChild( viewCaption );

};

EDITOR.View2D.prototype = {

	constructor: EDITOR.View2D,

	resize: function ( width, height, left, top ) {

		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left   = left   + 'px';
		this.node.style.top    = top    + 'px';

		this.context.setAttribute( 'width', width + 'px' );
		this.context.setAttribute( 'height', height + 'px' );

	},

	setPointSet: function ( pointSet ) {

		var self = this;
		var indices = [ 0, 0, 0 ];

		pointSet.forEach( function ( point ) {

			var g = point.group;
			var index = indices[ g ];

			var x = point.coords.x;
			var y = ( ( self.direction === 'top' ) ? point.coords.z : point.coords.y );

			if ( self.points[ g ].length <= index ) {
				var circle = document.createElementNS( self.NS, 'circle' );
				circle.setAttribute( 'cx', 0 );
				circle.setAttribute( 'cy', 0 );
				circle.setAttribute( 'r', 1 );
				circle.style.fill = self.colors[ g ];
				circle.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
				self.group.appendChild( circle );
				self.points[ g ].push( circle );
			} else {
				var circle = self.points[ g ][ index ];
				circle.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
				circle.style.display = 'block';
			}

			indices[ g ]++;

		} );

		this.points.forEach( function ( array, index ) {

			while ( indices[ index ] < array.length ) {
				array[ indices[ index ] ].style.display = 'none';
				indices[ index ]++;
			}

		} );

	}

};


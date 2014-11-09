EDITOR.View2D = function ( node, direction ) {

	this.direction = direction;
	this.width = undefined;
	this.height = undefined;

	this.node = node;
	this.node.setAttribute( 'class', 'viewNode' );

	this.NS = 'http://www.w3.org/2000/svg';
	this.context = document.createElementNS( this.NS, 'svg' );
	this.context.setAttribute( 'viewBox', '-1,-1,102,102' );
	this.node.appendChild( this.context );

	this.background = document.createElementNS( this.NS, 'rect' );
	this.background.setAttribute( 'x', '-1' );
	this.background.setAttribute( 'y', '-1' );
	this.background.setAttribute( 'width', '102' );
	this.background.setAttribute( 'height', '102' );
	this.context.appendChild( this.background );

	var onMouseDown = function ( event ) {
		if ( EDITOR.TOOLBAR.mode === 'DRAW' && EDITOR.PointSetModifier.pointSet !== null ) {
			var x = 0; // TODO: calculate these somehow from event data
			var y = 0;
			var z = 0;
			EDITOR.PointSetModifier.addPoint( x, y, z );
		}
	};
	this.background.addEventListener( 'mousedown', onMouseDown, false );

	this.group = document.createElementNS( this.NS, 'g' );
	this.context.appendChild( this.group );

	this.points = [];
	this.colors = [ '#cc0000', '#ffcc00', '#006600' ];

	var viewCaption = document.createElement( 'div' );
	viewCaption.setAttribute( 'class', 'viewCaption' );
	viewCaption.innerHTML = direction;
	this.node.appendChild( viewCaption );

};

EDITOR.View2D.prototype = {

	constructor: EDITOR.View2D,

	resize: function ( width, height, left, top ) {

		this.width = width;
		this.height = height;

		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left   = left   + 'px';
		this.node.style.top    = top    + 'px';

		this.context.setAttribute( 'width', width + 'px' );
		this.context.setAttribute( 'height', height + 'px' );

	},

	loadPointSet: function () {

		var self = this;
		var index = 0;

		EDITOR.PointSetModifier.forEach( function ( modifier ) {

			if ( modifier.active ) {

				var point = modifier.point;
				var g = point.group;

				var point2D = self.get2DPoint( index );
				point2D.modifier = modifier;
				point2D.setColor( self.colors[ g ] );

				var setPosition = function () {
					var x = point.coords.x;
					var y = ( ( self.direction === 'top' ) ? point.coords.z : point.coords.y );
					point2D.node.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
				};
				setPosition();
				modifier.registerListener( setPosition );

				modifier.registerDestructor( function () {
					point2D.setVisibility( false );
					point2D.modifier = undefined;
				} );

				index++;

			}

		} );

		while ( index < this.points.length ) {
			this.points[ index ].setVisibility( false );
			index++;
		}

	},

	get2DPoint: function ( index ) {

		if ( this.points.length <= index ) {
			var point2D = new EDITOR.View2DPoint( this );
			this.points.push( point2D );
			return point2D;
		} else {
			var point2D = this.points[ index ];
			point2D.setVisibility( true );
			return point2D;
		}

	}

};


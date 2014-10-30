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

	this.group = document.createElementNS( this.NS, 'g' );
	this.context.appendChild( this.group );

	this.circles = [];
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

				var circle = self.getCircle( index );
				circle.modifier = modifier;
				circle.node.style.fill = self.colors[ g ];

				var setPosition = function () {
					var x = point.coords.x;
					var y = ( ( self.direction === 'top' ) ? point.coords.z : point.coords.y );
					circle.node.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
				};
				setPosition();
				modifier.registerListener( setPosition );

				index++;

			}

		} );

		while ( index < this.circles.length ) {
			this.circles[ index ].node.style.display = 'none';
			index++;
		}

	},

	getCircle: function ( index ) {

		if ( this.circles.length <= index ) {
			var circle = new EDITOR.View2DCircle( this );
			this.circles.push( circle );
			return circle;
		} else {
			var circle = this.circles[ index ];
			circle.node.style.display = 'block';
			return circle;
		}

	}

};


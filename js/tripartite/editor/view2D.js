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
		var indices = [ 0, 0, 0 ];

		EDITOR.PointSetModifier.forEach( function ( modifier ) {

			if ( modifier.active ) {

				var point = modifier.point;
				var g = point.group;
				var index = indices[ g ];
				var circle = undefined;

				if ( self.points[ g ].length <= index ) {
					circle = document.createElementNS( self.NS, 'circle' );
					circle.setAttribute( 'cx', 0 );
					circle.setAttribute( 'cy', 0 );
					circle.setAttribute( 'r', 1 );
					circle.style.fill = self.colors[ g ];
					self.group.appendChild( circle );
					self.points[ g ].push( circle );
				} else {
					circle = self.points[ g ][ index ];
					circle.style.display = 'block';
				}

				var setPosition = function () {
					var x = point.coords.x;
					var y = ( ( self.direction === 'top' ) ? point.coords.z : point.coords.y );
					circle.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
				};
				setPosition();
				modifier.registerListener( setPosition );

				var vector0 = new THREE.Vector2();
				var vectorT = new THREE.Vector2();
				var offset = new THREE.Vector3();
				var beginDrag = function ( event ) {

					event.preventDefault();
					event.stopPropagation();

					vector0.setFromEvent( event );
					modifier.snap();

					var cancelSelect = function ( event ) {
						event.preventDefault();
						event.stopPropagation();
					};

					var continueDrag = function ( event ) {
						event.preventDefault();
						event.stopPropagation();
						vectorT.setFromEvent( event );
						vectorT.sub( vector0 );
						offset.x = vectorT.x * 100 / self.height;
						if ( self.direction === 'top' ) {
							offset.z = vectorT.y * 100 / self.height;
							offset.y = 0;
						} else {
							offset.y = vectorT.y * 100 / self.height;
							offset.z = 0;
						}
						modifier.drag( offset );
					};

					var endDrag = function () {
						document.removeEventListener( 'selectstart', cancelSelect, false );
						document.removeEventListener( 'mousemove',   continueDrag, false );
						document.removeEventListener( 'mouseup',     endDrag, false );
					};

					document.addEventListener( 'selectstart', cancelSelect, false );
					document.addEventListener( 'mousemove',   continueDrag, false );
					document.addEventListener( 'mouseup',     endDrag, false );

				};
				circle.addEventListener( 'mousedown',  beginDrag, false );

				indices[ g ]++;

			}

		} );

		this.points.forEach( function ( array, index ) {

			while ( indices[ index ] < array.length ) {
				array[ indices[ index ] ].style.display = 'none';
				indices[ index ]++;
			}

		} );

	}

};


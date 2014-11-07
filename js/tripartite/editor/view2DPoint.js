EDITOR.View2DPoint = function ( view ) {

	this.modifier = undefined;
	this.view = view;

	this.NS = 'http://www.w3.org/2000/svg';

	this.node = document.createElementNS( this.NS, 'g' );
	this.view.group.appendChild( this.node );

	this.pointHandle = document.createElementNS( this.NS, 'circle' );
	this.pointHandle.setAttribute( 'cx', 0 );
	this.pointHandle.setAttribute( 'cy', 0 );
	this.pointHandle.setAttribute( 'r', 3 );
	this.pointHandle.setAttribute( 'class', 'handle2D' );
	this.node.appendChild( this.pointHandle );

	this.pointDot = document.createElementNS( this.NS, 'circle' );
	this.pointDot.setAttribute( 'cx', 0 );
	this.pointDot.setAttribute( 'cy', 0 );
	this.pointDot.setAttribute( 'r', 1 );
	this.pointDot.setAttribute( 'class', 'dot2D' );
	this.node.appendChild( this.pointDot );

	var self = this;
	var vector0 = new THREE.Vector2();
	var vectorT = new THREE.Vector2();
	var offset = new THREE.Vector3();
	var beginDrag = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( EDITOR.TOOLBAR.mode === 'ERASE' ) {

			var point = self.modifier.point;
			self.modifier.deactivate();
			EDITOR.PointSetModifier.pointSet.removePoint( point );
			EDITOR.PointSetModifier.onChange();

		} else {

			vector0.setFromEvent( event );
			self.modifier.snap();

			var cancelSelect = function ( event ) {
				event.preventDefault();
				event.stopPropagation();
			};

			var continueDrag = function ( event ) {
				event.preventDefault();
				event.stopPropagation();
				vectorT.setFromEvent( event );
				vectorT.sub( vector0 );
				offset.x = vectorT.x * 100 / self.view.height;
				if ( self.view.direction === 'top' ) {
					offset.z = vectorT.y * 100 / self.view.height;
					offset.y = 0;
				} else {
					offset.y = vectorT.y * 100 / self.view.height;
					offset.z = 0;
				}
				self.modifier.drag( offset );
			};

			var endDrag = function () {
				document.removeEventListener( 'selectstart', cancelSelect, false );
				document.removeEventListener( 'mousemove',   continueDrag, false );
				document.removeEventListener( 'mouseup',     endDrag,      false );
			};

			document.addEventListener( 'selectstart', cancelSelect, false );
			document.addEventListener( 'mousemove',   continueDrag, false );
			document.addEventListener( 'mouseup',     endDrag,      false );

		}

	};
	this.pointHandle.addEventListener( 'mousedown', beginDrag, false );

};

EDITOR.View2DPoint.prototype = {

	constructor: EDITOR.View2DPoint,

	setColor: function ( color ) {

		this.pointDot.style.fill = color;

	},

	setVisibility: function ( b ) {

		this.node.style.display = ( b ? 'block' : 'none' );

	}

};


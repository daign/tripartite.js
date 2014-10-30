EDITOR.View2DCircle = function ( view ) {

	this.modifier = undefined;
	this.view = view;

	this.NS = 'http://www.w3.org/2000/svg';

	this.node = document.createElementNS( this.NS, 'circle' );
	this.node.setAttribute( 'cx', 0 );
	this.node.setAttribute( 'cy', 0 );
	this.node.setAttribute( 'r', 1 );
	this.view.group.appendChild( this.node );

	var self = this;
	var vector0 = new THREE.Vector2();
	var vectorT = new THREE.Vector2();
	var offset = new THREE.Vector3();
	var beginDrag = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

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

	};
	this.node.addEventListener( 'mousedown', beginDrag, false );

};

EDITOR.View2DCircle.prototype = {

	constructor: EDITOR.View2DCircle

};


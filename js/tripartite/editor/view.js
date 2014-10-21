EDITOR.View = function ( node ) {

	this.node = node;
	this.node.setAttribute( 'class', 'viewNode' );

};

EDITOR.View.prototype = {

	constructor: EDITOR.View,

	resize: function ( width, height, left, top ) {
		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left   = left   + 'px';
		this.node.style.top    = top    + 'px';
	}

};


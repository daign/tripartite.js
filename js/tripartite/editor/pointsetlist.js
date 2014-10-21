EDITOR.PointSetList = function ( node, store ) {

	this.node = node;
	this.store = store;

	this.node.setAttribute( 'class', 'listNode' );
	this.node.innerHTML = 'ListNode';

};

EDITOR.PointSetList.prototype = {

	constructor: EDITOR.PointSetList,

	resize: function ( width, height ) {
		this.node.style.width = width + 'px';
		this.node.style.height = height + 'px';
	}

};


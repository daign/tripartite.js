EDITOR.AddDialog = function ( node ) {

	var self = this;

	this.node = node;
	this.node.setAttribute( 'class', 'dialogNode' );

	var overlay = document.createElement( 'div' );
	overlay.setAttribute( 'class', 'dialogOverlay' );
	this.node.appendChild( overlay );

	this.box = document.createElement( 'div' );
	this.box.setAttribute( 'class', 'box dialogBox' );
	this.node.appendChild( this.box );

	var header = document.createElement( 'div' );
	header.setAttribute( 'class', 'boxheader' );
	header.innerHTML = 'Add Point Set';
	this.box.appendChild( header );

	this.box.appendChild( document.createTextNode( 'Random: ' ) );
	this.sel1 = new PAGES.SELECT( this.box, false, 0, null, [
		[ '10', '3x10' ],
		[ '30', '3x30' ],
		[ '60', '3x60' ]
	] );

	this.box.appendChild( document.createElement( 'br' ) );
	this.box.appendChild( document.createElement( 'br' ) );

	var cancelButton = document.createElement( 'input' );
	cancelButton.type = 'button';
	cancelButton.value = 'Cancel';
	var onCancel = function () {
		self.display( false );
	};
	cancelButton.addEventListener( 'click', onCancel, false );
	this.box.appendChild( cancelButton );

	var addButton = document.createElement( 'input' );
	addButton.type = 'button';
	addButton.value = 'Add';
	var onAdd = function () {
		var pointSet = new GEOMETRY.PointSet();
		pointSet.generateRandom( parseInt( self.sel1.get() ) );
		POINTS.storePermanent.entries.push( pointSet );
		EDITOR.setList.update();
		self.display( false );
	};
	addButton.addEventListener( 'click', onAdd, false );
	this.box.appendChild( addButton );

};

EDITOR.AddDialog.prototype = {

	constructor: EDITOR.AddDialog,

	resize: function ( width, height ) {
		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.box.style.left = ( 0.5 * width - 200 ) + 'px';
	},

	display: function ( b ) {
		this.node.style.display = b ? 'block' : 'none';
	}

};


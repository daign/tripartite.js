EDITOR.PointSetListEntry = function ( parent ) {

	var self = this;

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'listEntry' );
	parent.appendChild( this.node );

	this.inputBox = document.createElement( 'div' );
	this.inputBox.setAttribute( 'class', 'listEntryBox' );
	this.inputBox.style.width = '40px';
	this.node.appendChild( this.inputBox );

	this.infoBox = document.createElement( 'div' );
	this.infoBox.setAttribute( 'class', 'listEntryBox' );
	this.infoBox.style.width = '135px';
	this.infoBox.style.cursor = 'pointer';
	this.node.appendChild( this.infoBox );

	var onClick = function () {
		EDITOR.setList.deactivateAll();
		self.activate( true );
	};
	this.infoBox.addEventListener( 'click', onClick, false );

};

EDITOR.PointSetListEntry.prototype = {

	constructor: EDITOR.PointSetListEntry,

	set: function ( pointSet ) {
		this.activate( false );
		this.infoBox.innerHTML = pointSet.points.length + ' Points';
		this.display( true );
	},

	display: function ( b ) {
		this.node.style.display = ( b ? 'block' : 'none' );
	},

	activate: function ( b ) {
		this.infoBox.style.background = ( b ? 'linear-gradient( #9cf, #6ad )' : 'linear-gradient( #eee, #ddd )' );
	}

};


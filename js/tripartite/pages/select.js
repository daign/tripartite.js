PAGES.SELECT = function ( parent, multiple, defaultIndex, onChangeFunction, options ) {

	this.node = document.createElement( 'select' );
	this.node.multiple = multiple;
	parent.appendChild( this.node );

	for ( var i = 0; i < options.length; i++ ) {
		var op = document.createElement( 'option' );
		op.value = options[ i ][ 0 ];
		op.innerHTML = options[ i ][ 1 ];
		this.node.appendChild( op );
	}

	if ( !multiple ) {
		this.node.selectedIndex = defaultIndex;
	}

	if ( onChangeFunction !== null ) {
		this.node.addEventListener( 'change', onChangeFunction, false );
	}

	this.node.addEventListener( 'click', function ( event ) {
		event.preventDefault();
		event.stopPropagation();
	}, false );

};

PAGES.SELECT.prototype = {

	constructor: PAGES.SELECT,

	get: function () {
		return this.node.value;
	}

};


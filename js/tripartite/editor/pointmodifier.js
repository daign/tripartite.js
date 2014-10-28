EDITOR.PointModifier = function () {

	this.active = false;
	this.point = undefined;
	this.listeners = [];
	this.snapshot = new THREE.Vector3();

};

EDITOR.PointModifier.prototype = {

	constructor: EDITOR.PointModifier,

	set: function ( point ) {
		this.active = true;
		this.point = point;
	},

	registerListener: function ( callback ) {
		this.listeners.push( callback );
	},

	deactivate: function () {
		this.active = false;
		this.point = undefined;
		this.listeners = [];
	},

	snap: function () {
		if ( this.point !== undefined ) { // why does it happen to be undefined sometimes?
			this.snapshot.copy( this.point.coords );
		}
	},

	drag: function ( offset ) {
		if ( this.point !== undefined ) {
			this.point.coords.copy( offset.add( this.snapshot ).clampScalar( 0, 100 ) );
			this.listeners.forEach( function ( callback ) {
				callback();
			} );
		}
	}

};


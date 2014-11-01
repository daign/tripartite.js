EDITOR.PointSetModifier = {

	pointSet: undefined,
	pointModifiers: [],

	setListeners: [],
	changeListeners: [],

	set: function ( pointSet ) {

		var self = this;
		this.pointSet = pointSet;
		this.changeListeners = [];

		this.pointModifiers.forEach( function ( modifier ) {
			modifier.deactivate();
		} );

		pointSet.forEach( function ( point, index ) {
			if ( self.pointModifiers[ index ] === undefined ) {
				var modifier = new EDITOR.PointModifier();
				modifier.set( point );
				self.pointModifiers.push( modifier );
			} else {
				self.pointModifiers[ index ].set( point );
			}
		} );

		this.onSet();

	},

	forEach: function ( f ) {
		this.pointModifiers.forEach( f );
	},

	registerSetListener: function ( callback, context ) {
		this.setListeners.push( function () {
			callback.apply( context );
		} );
	},

	registerChangeListener: function ( callback, context ) {
		this.changeListeners.push( function () {
			callback.apply( context );
		} );
	},

	onSet: function () {
		this.setListeners.forEach( function ( callback ) {
			callback();
		} );
	},

	onChange: function () {
		this.changeListeners.forEach( function ( callback ) {
			callback();
		} );
	}

};


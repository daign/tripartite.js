EDITOR.PointSetModifier = {

	pointSet: undefined,
	pointModifiers: [],

	set: function ( pointSet ) {

		var self = this;
		this.pointSet = pointSet;

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

	},

	forEach: function ( f ) {
		this.pointModifiers.forEach( f );
	}

};


EDITOR.PointSetModifier = {

	pointSet: null,
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

		if ( pointSet !== null ) {
			pointSet.forEach( function ( point, index ) {
				if ( self.pointModifiers[ index ] === undefined ) {
					var modifier = new EDITOR.PointModifier();
					modifier.set( point );
					self.pointModifiers.push( modifier );
				} else {
					self.pointModifiers[ index ].set( point );
				}
			} );
		}

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
	},

	removeDoublePoints: function () {

		for ( var i = 0; i < this.pointModifiers.length; i++ ) {
			for ( var j = i+1; j < this.pointModifiers.length; j++ ) {
				if (
					   this.pointModifiers[ i ].active
					&& this.pointModifiers[ j ].active
					&& this.pointModifiers[ i ].point.equals( this.pointModifiers[ j ].point )
				) {
					var point = this.pointModifiers[ j ].point;
					this.pointModifiers[ j ].deactivate();
					this.pointSet.removePoint( point );
				}
			}
		}

		this.onChange();

	},

	addPoint: function ( x, y, z ) {

		var group = EDITOR.TOOLBAR.color;
		var point = new GEOMETRY.Point( new THREE.Vector3( x, y, z ), group );
		this.pointSet.points.push( point );

		var modifier = new EDITOR.PointModifier(); // TODO: reuse if unused PointModifiers available
		modifier.set( point );
		this.pointModifiers.push( modifier );

		this.onSet(); // TODO: find solution to add point to view without rebuilding the whole view
		this.onChange();

	}

};


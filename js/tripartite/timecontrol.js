var TIMECONTROL = {

	func: undefined,
	speed: undefined,
	interval: undefined,

	listeners: [],

	setSpeed: function ( s ) {
		this.speed = s;
	},

	start: function ( f ) {
		if ( this.interval === undefined && this.func === undefined ) {
			this.func = f;
			this.interval = setInterval( this.func, this.speed );
			this.notifyListeners();
		}
	},

	stop: function () {
		if ( this.interval !== undefined ) {
			window.clearInterval( this.interval );
			this.interval = undefined;
			this.notifyListeners();
		}
	},

	resume: function () {
		if ( this.interval === undefined && this.func !== undefined ) {
			this.interval = setInterval( this.func, this.speed );
			this.notifyListeners();
		}
	},

	pauseplay: function () {
		if ( this.func !== undefined ) {
			if ( this.interval !== undefined ) {
				this.stop();
			} else {
				this.resume();
			}
			this.notifyListeners();
		}
	},

	stepForward: function () {
		if ( this.interval === undefined && this.func !== undefined ) {
			this.func();
		}
	},

	clear: function () {
		this.stop();
		this.func = undefined;
		this.notifyListeners();
	},

	addListener: function ( l ) {
		this.listeners.push( l );
	},

	notifyListeners: function () {
		var state = undefined;
		if ( this.func === undefined ) {
			state = 'clear';
		} else if ( this.interval === undefined ) {
			state = 'paused';
		} else {
			state = 'running';
		}
		for ( var i = 0; i < this.listeners.length; i++ ) {
			this.listeners[ i ]( state );
		}
	}

};


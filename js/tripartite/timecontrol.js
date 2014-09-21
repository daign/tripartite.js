var TIMECONTROL = {

	task: undefined,
	speed: undefined,
	interval: undefined,
	paused: false,

	listeners: [],

	setSpeed: function ( s ) {
		if ( this.interval === undefined && this.task === undefined ) {
			this.speed = s;
		}
		return this;
	},

	setPaused: function ( p ) {
		if ( this.interval === undefined && this.task === undefined ) {
			this.paused = p;
		}
		return this;
	},

	setTask: function ( t ) {
		if ( this.interval === undefined && this.task === undefined ) {
			this.task = t;
			PAGES.INFOSTATS.update();
			this.notifyListeners();
		}
		return this;
	},

	start: function () {
		if ( this.interval === undefined && this.task !== undefined && !this.paused ) {
			var self = this;
			this.interval = setInterval( function () {
				self.task();
				PAGES.INFOSTATS.update();
			}, this.speed );
			this.notifyListeners();
		}
	},

	stepForward: function () {
		if ( this.interval === undefined && this.task !== undefined ) {
			this.task();
			PAGES.INFOSTATS.update();
		}
	},

	stop: function () {
		if ( this.interval !== undefined ) {
			window.clearInterval( this.interval );
			this.interval = undefined;
			this.notifyListeners();
		}
	},

	pauseplay: function () {
		if ( this.task !== undefined ) {
			if ( this.interval !== undefined ) {
				this.paused = true;
				this.stop();
			} else {
				this.paused = false;
				this.start();
			}
		}
	},

	clear: function () {
		this.stop();
		this.task = undefined;
		this.notifyListeners();
	},

	addListener: function ( l ) {
		this.listeners.push( l );
	},

	notifyListeners: function () {
		var state = undefined;
		if ( this.task === undefined ) {
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


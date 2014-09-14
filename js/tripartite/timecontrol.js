var TIMECONTROL = {

	func: undefined,
	speed: undefined,
	interval: undefined,

	node: undefined,

	setSpeed: function ( s ) {
		this.speed = s;
	},

	start: function ( f ) {
		this.showNode();
		if ( this.interval === undefined && this.func === undefined ) {
			this.func = f;
			this.interval = setInterval( this.func, this.speed );
		}
	},

	stop: function () {
		if ( this.interval !== undefined ) {
			window.clearInterval( this.interval );
			this.interval = undefined;
		}
	},

	resume: function () {
		if ( this.interval === undefined && this.func !== undefined ) {
			this.interval = setInterval( this.func, this.speed );
		}
	},

	pauseplay: function () {
		if ( this.func !== undefined ) {
			if ( this.interval !== undefined ) {
				this.stop();
			} else {
				this.resume();
			}
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
	},

	showNode: function () {
		if ( this.node === undefined ) {
			this.node = document.createElement( 'input' );
			this.node.type = 'button';
			this.node.value = 'pause/play';
			this.node.setAttribute( 'class', 'absolute' );
			PAGES.SIMULATION.node.appendChild( this.node );
			this.node.addEventListener( 'click', function () { TIMECONTROL.pauseplay(); }, false );
		}
	}

};


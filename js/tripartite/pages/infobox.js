PAGES.INFOBOX = {

	open: true,

	pass: undefined,
	phase: undefined,
	setUp: undefined,
	record: undefined,

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'box absolute' );
		PAGES.SIMULATION.node.appendChild( this.node );

		this.content1 = document.createElement( 'div' );
		this.node.appendChild( this.content1 );

		this.homeButton = document.createElement( 'input' );
		this.homeButton.type = 'button';
		this.homeButton.value = 'home';
		this.content1.appendChild( this.homeButton );
		this.homeButton.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			event.stopPropagation();
			TIMECONTROL.clear();
			PAGES.show( 'settings' );
		}, false );

		this.pauseButton = document.createElement( 'input' );
		this.pauseButton.type = 'button';
		this.content1.appendChild( this.pauseButton );
		this.pauseButton.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			event.stopPropagation();
			TIMECONTROL.pauseplay();
		}, false );

		this.stepButton = document.createElement( 'input' );
		this.stepButton.type = 'button';
		this.stepButton.value = 'step forward';
		this.content1.appendChild( this.stepButton );
		this.stepButton.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			event.stopPropagation();
			TIMECONTROL.stepForward();
		}, false );

		var self = this;
		var updateButtons = function ( state ) {
			if ( state === 'running' ) {
				self.pauseButton.value = 'pause';
				self.pauseButton.disabled = false;
				self.stepButton.disabled = true;
			} else if ( state === 'paused' ) {
				self.pauseButton.value = 'play';
				self.pauseButton.disabled = false;
				self.stepButton.disabled = false;
			} else if ( state === 'clear' ) {
				self.pauseButton.value = 'play';
				self.pauseButton.disabled = true;
				self.stepButton.disabled = true;
			}
		};
		TIMECONTROL.addListener( updateButtons );

		this.content2 = document.createElement( 'div' );
		this.node.appendChild( this.content2 );

		this.content3 = document.createElement( 'div' );
		this.node.appendChild( this.content3 );

		var self = this;
		function onClick() {
			self.toggle();
		}
		this.node.addEventListener( 'click', onClick, false );
	},

	update: function () {
		this.content2.innerHTML = (
			  '<hr>'
			+ ( ( this.pass !== undefined ) ? 'pass: ' + this.pass + '<br>' : '' )
			+ 'algorithm: ' + this.setUp + '<br>'
			+ 'phase: ' + this.phase
		);
		if ( this.open ) {
			this.content3.innerHTML = (
				  '<hr>'
				+ 'intersections: ' + COUNTING.countAllIntersections( false ) + '<br>'
				+ 'area: ' + Math.round( COUNTING.countAllAreas() ) + '<br>'
				+ 'longest edges: ' + Math.round( COUNTING.countAllLongestEdges() ) + '<hr>'
				+ 'swaps: ' + this.record.swaps + '<br>'
				+ 'testswaps: ' + this.record.testswaps + '<br>'
				+ 'intersectiontests: ' + this.record.intersectiontests
			);
		} else {
			this.content3.innerHTML = '';
		}
	},

	setPass: function ( p ) {
		this.pass = p;
	},
	setPhase: function ( p ) {
		this.phase = p;
		return this;
	},
	setSetUp: function ( l ) {
		this.setUp = l;
	},
	setRecord: function ( r ) {
		this.record = r;
	},

	toggle: function () {
		this.open = !this.open;
		this.update();
	}

};


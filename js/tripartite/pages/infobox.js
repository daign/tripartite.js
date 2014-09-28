PAGES.INFOBOX = {

	open: 1,

	pass:  undefined,
	setUp: undefined,
	phase: undefined,

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'box absolute' );
		PAGES.SIMULATION.node.appendChild( this.node );

		this.playControls = document.createElement( 'div' );
		this.node.appendChild( this.playControls );

		this.homeButton = document.createElement( 'input' );
		this.homeButton.type = 'button';
		this.homeButton.value = 'home';
		this.playControls.appendChild( this.homeButton );
		this.homeButton.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			event.stopPropagation();
			TIMECONTROL.clear();
			PAGES.show( 'settings' );
		}, false );

		this.pauseButton = document.createElement( 'input' );
		this.pauseButton.type = 'button';
		this.playControls.appendChild( this.pauseButton );
		this.pauseButton.addEventListener( 'click', function ( event ) {
			event.preventDefault();
			event.stopPropagation();
			TIMECONTROL.pauseplay();
		}, false );

		this.stepButton = document.createElement( 'input' );
		this.stepButton.type = 'button';
		this.stepButton.value = 'step forward';
		this.playControls.appendChild( this.stepButton );
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

		this.permanentContent = document.createElement( 'div' );
		this.node.appendChild( this.permanentContent );

		this.variableContent1 = document.createElement( 'div' );
		this.variableContent1.style.display = 'none';
		this.node.appendChild( this.variableContent1 );
		PAGES.INFOSTATS.init( this.variableContent1 );

		this.variableContent2 = document.createElement( 'div' );
		this.variableContent2.style.display = 'none';
		this.node.appendChild( this.variableContent2 );

		this.variableContent2.appendChild( document.createElement( 'hr' ) );
		var materialText = document.createElement( 'span' );
		materialText.innerHTML = 'material: ';
		this.variableContent2.appendChild( materialText );

		var onMaterial = function ( event ) {
			VISUALISATION.setMaterialMode( self.materialSelect.get() );
		};
		this.materialSelect = new PAGES.SELECT( this.variableContent2, false, 0, onMaterial, [
			[ 'standard',      'standard blue' ],
			[ 'intersections', 'show intersections' ],
			[ 'normal',        'normal material' ]
		] );

		var self = this;
		var onClick = function () {
			self.toggle();
		};
		this.node.addEventListener( 'click', onClick, false );
	},

	update: function () {
		this.permanentContent.innerHTML = (
			  '<hr>'
			+ ( ( this.pass  !== undefined ) ?      'pass: ' + this.pass  + '<br>' : '' )
			+ ( ( this.setUp !== undefined ) ? 'algorithm: ' + this.setUp + '<br>' : '' )
			+ ( ( this.phase !== undefined ) ?     'phase: ' + this.phase : '' )
		);
		this.variableContent1.style.display = 'none';
		this.variableContent2.style.display = 'none';
		if ( this.open === 1 ) {
			this.variableContent1.style.display = 'block';
		} else if ( this.open === 2 ) {
			this.variableContent2.style.display = 'block';
		}
	},

	setPass: function ( p ) {
		this.pass = p;
		this.update();
	},
	setSetUp: function ( l ) {
		this.setUp = l;
		this.update();
	},
	setPhase: function ( p ) {
		this.phase = p;
		this.update();
	},

	reset: function () {
		this.open = 1;
		this.pass = undefined;
		this.setUp = undefined;
		this.phase = undefined;
	},

	toggle: function () {
		this.open = ( this.open + 1 ) % 3;
		this.update();
	}

};


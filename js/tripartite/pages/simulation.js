PAGES.SIMULATION = {

	visible: false,
	visualEnabled: undefined,

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'simulation';
		document.body.appendChild( this.node );

		this.canvas = document.createElement( 'canvas' );
		this.canvas.style.display = 'none';
		this.node.appendChild( this.canvas );

		var self = this;

		var onSwitch = function ( r ) {
			self.visible = r;
			self.canvas.style.display = self.visualEnabled ? 'block' : 'none';
			onWindowResize();
		};
		PAGES.add( this.node, 'simulation', onSwitch );

		PAGES.VISU.init( this.canvas );
		PAGES.INFOBOX.init();

		function onWindowResize() {
			if ( PAGES.SIMULATION.visible && PAGES.SIMULATION.visualEnabled ) {
				PAGES.VISU.scene.resize();
			}
		}
		window.addEventListener( 'resize', onWindowResize, false );

	},

	update: function () {
		if ( this.visualEnabled ) {
			PAGES.VISU.update();
		}
		PAGES.INFOBOX.update();
	}

};


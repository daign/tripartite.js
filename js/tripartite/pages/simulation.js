PAGES.SIMULATION = {

	visible: false,
	visualEnabled: undefined,

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'simulation';
		document.body.appendChild( this.node );

		var onSwitch = function ( r ) {
			PAGES.SIMULATION.visible = r;
			onWindowResize();
		};

		PAGES.add( this.node, 'simulation', onSwitch );

		PAGES.VISU.init();
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


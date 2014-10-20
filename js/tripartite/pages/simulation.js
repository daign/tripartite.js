PAGES.SIMULATION = {

	init: function () {

		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'simulation';
		document.body.appendChild( this.node );

		this.canvas = document.createElement( 'canvas' );
		this.canvas.style.display = 'none';
		this.node.appendChild( this.canvas );

		var self = this;

		var onSwitch = function ( v ) {
			if ( !v ) {
				self.visualisation.enabled = false;
				self.canvas.style.display = 'none';
			}
		};
		PAGES.add( this.node, 'simulation', onSwitch );

		this.visualisation = new VISUALISATION( this.canvas );
		PAGES.INFOBOX.init();

	},

	setEnabled: function ( parameters ) {

		PAGES.INFOBOX.setVisualEnabled( parameters.visual );
		PAGES.INFOSTATS.setProgressDiagramEnabled( parameters.progressDiagram );
		this.visualisation.enabled = parameters.visual;
		this.visualisation.resize();
		this.canvas.style.display = ( parameters.visual ? 'block' : 'none' );

	},

	update: function () {

		this.visualisation.update();

	}

};


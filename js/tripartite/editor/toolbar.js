EDITOR.TOOLBAR = {

	node: undefined,
	mode: 'MOVE',
	tools: [],
	listeners: [],

	color: 0,
	colors: [],

	setNode: function ( node ) {

		this.node = node;
		this.node.setAttribute( 'class', 'toolbar' );

		var self = this;

		var ToolBarButton = function ( icon, callback ) {
			this.div = document.createElement( 'div' );
			this.div.setAttribute( 'class', 'toolbarButton' );
			this.setActivation( false );
			self.node.appendChild( this.div );

			var img = document.createElement( 'img' );
			img.src = 'images/' + icon;
			this.div.appendChild( img );

			var buttonSelf = this;
			this.div.addEventListener( 'click', function () {
				self.deactivateAll();
				buttonSelf.setActivation( true );
				callback();
				self.callListeners();
			}, false );
		};
		ToolBarButton.prototype = {
			constructor: ToolBarButton,
			setActivation: function ( b ) {
				this.div.style.background = ( b ? '#36a' : '#999' );
				return this;
			}
		};

		this.tools.push( new ToolBarButton( 'tool-move.png', function () {
			self.mode = 'MOVE';
		} ).setActivation( true ) );
		this.tools.push( new ToolBarButton( 'tool-pen.png', function () {
			self.mode = 'DRAW';
		} ) );
		this.tools.push( new ToolBarButton( 'tool-bucket.png', function () {
			self.mode = 'FILL';
		} ) );
		this.tools.push( new ToolBarButton( 'tool-eraser.png', function () {
			self.mode = 'ERASE';
		} ) );

		var spacer = document.createElement( 'div' );
		spacer.setAttribute( 'class', 'toolbarSpacer' );
		this.node.appendChild( spacer );

		var ColorButton = function ( colorID ) {
			this.div = document.createElement( 'div' );
			this.div.setAttribute( 'class', 'toolbarColor' );
			var colorCodes = [ '#cc0000', '#ffcc00', '#006600' ];
			this.div.style.background = colorCodes[ colorID ];
			this.setActivation( false );
			self.node.appendChild( this.div );

			var buttonSelf = this;
			this.div.addEventListener( 'click', function () {
				self.deactivateAllColors();
				buttonSelf.setActivation( true );
				self.color = colorID;
			}, false );
		};
		ColorButton.prototype = {
			constructor: ColorButton,
			setActivation: function ( b ) {
				this.div.style.borderColor = ( b ? '#fff' : '#999' );
				this.div.style.opacity = ( b ? 1 : 0.6 );
				return this;
			}
		};

		this.colors.push( new ColorButton( 0 ).setActivation( true ) );
		this.colors.push( new ColorButton( 1 ) );
		this.colors.push( new ColorButton( 2 ) );

	},

	resize: function ( height ) {
		this.node.style.height = height + 'px';
	},

	deactivateAll: function () {
		this.tools.forEach( function ( tool ) {
			tool.setActivation( false );
		} );
	},

	deactivateAllColors: function () {
		this.colors.forEach( function ( color ) {
			color.setActivation( false );
		} );
	},

	addListener: function ( callback ) {
		this.listeners.push( callback );
	},

	callListeners: function () {
		this.listeners.forEach( function ( callback ) {
			callback();
		} );
	}

};


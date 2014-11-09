EDITOR.TOOLBAR = {

	node: undefined,
	mode: 'MOVE',
	tools: [],

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
		this.tools.push( new ToolBarButton( 'tool-eraser.png', function () {
			self.mode = 'ERASE';
		} ) );

	},

	resize: function ( height ) {
		this.node.style.height = height + 'px';
	},

	deactivateAll: function () {
		this.tools.forEach( function ( tool ) {
			tool.setActivation( false );
		} );
	}

};


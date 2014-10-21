EDITOR = {

	init: function () {

		var self = this;

		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'editor';
		document.body.appendChild( this.node );

		PAGES.add( this.node, 'editor', function () {} );

		this.listDiv = document.createElement( 'div' );
		this.listDiv.setAttribute( 'class', 'halfbox left' );
		this.node.appendChild( this.listDiv );

		var backButton = document.createElement( 'input' );
		backButton.type = 'button';
		backButton.value = 'Done';
		var goBack = function () {
			PAGES.show( 'settings' );
		};
		backButton.addEventListener( 'click', goBack, false );
		this.listDiv.appendChild( backButton );

		var addPointSetButton = document.createElement( 'input' );
		addPointSetButton.type = 'button';
		addPointSetButton.value = 'Add Point Set';
		var addPointSet = function () {
			;
		};
		addPointSetButton.addEventListener( 'click', addPointSet, false );
		this.listDiv.appendChild( addPointSetButton );

		var listNode = document.createElement( 'div' );
		this.listDiv.appendChild( listNode );
		this.setList = new EDITOR.PointSetList( listNode, POINTS.storePermanent );

		this.viewDiv = document.createElement( 'div' );
		this.viewDiv.setAttribute( 'class', 'halfbox right' );
		this.node.appendChild( this.viewDiv );

		this.viewDiv.innerHTML = 'View';

		window.addEventListener( 'resize', function () { self.resize(); }, false );
		this.resize();

	},

	resize: function () {

		var width = window.innerWidth - 86;
		var height = window.innerHeight - 64;

		var listWidth = 200;
		this.listDiv.style.width = listWidth + 'px';
		this.listDiv.style.height = height + 'px';
		this.setList.resize( listWidth-6, height-39 );

		this.viewDiv.style.width = ( width - listWidth ) + 'px';
		this.viewDiv.style.height = height + 'px';

	}

};


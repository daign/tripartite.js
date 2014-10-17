PAGES.EDITOR = {

	init: function () {
		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'editor';
		this.node.style.overflow = 'auto';
		document.body.appendChild( this.node );

		PAGES.add( this.node, 'editor', function () {} );

		var listDiv = document.createElement( 'div' );
		listDiv.setAttribute( 'class', 'halfbox left' );
		listDiv.style.width = '20%';
		this.node.appendChild( listDiv );

		var backButton = document.createElement( 'input' );
		backButton.type = 'button';
		backButton.value = 'Done';
		var goBack = function () {
			PAGES.show( 'settings' );
		};
		backButton.addEventListener( 'click', goBack, false );
		listDiv.appendChild( backButton );

		var addPointSetButton = document.createElement( 'input' );
		addPointSetButton.type = 'button';
		addPointSetButton.value = 'Add Point Set';
		var addPointSet = function () {
			;
		};
		addPointSetButton.addEventListener( 'click', addPointSet, false );
		listDiv.appendChild( addPointSetButton );

		listDiv.appendChild( document.createElement( 'br' ) );
		listDiv.appendChild( document.createTextNode( 'List' ) );

		var viewDiv = document.createElement( 'div' );
		viewDiv.setAttribute( 'class', 'halfbox right' );
		viewDiv.style.width = '70%';
		this.node.appendChild( viewDiv );

		viewDiv.innerHTML = 'View';

	}

};


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
			self.addDialog.display( true );
		};
		addPointSetButton.addEventListener( 'click', addPointSet, false );
		this.listDiv.appendChild( addPointSetButton );

		var listNode = document.createElement( 'div' );
		this.listDiv.appendChild( listNode );
		this.setList = new EDITOR.PointSetList( listNode, POINTS.storePermanent );

		this.viewDiv = document.createElement( 'div' );
		this.viewDiv.setAttribute( 'class', 'halfbox right' );
		this.viewDiv.style.background = '#aaa';
		this.node.appendChild( this.viewDiv );

		var viewNode1 = document.createElement( 'div' );
		this.view1 = new EDITOR.View( viewNode1 );
		this.viewDiv.appendChild( viewNode1 );

		var viewNode2 = document.createElement( 'div' );
		this.view2 = new EDITOR.View( viewNode2 );
		this.viewDiv.appendChild( viewNode2 );

		var viewNode3 = document.createElement( 'div' );
		this.view3 = new EDITOR.View( viewNode3 );
		this.viewDiv.appendChild( viewNode3 );

		var viewNode4 = document.createElement( 'div' );
		this.view4 = new EDITOR.View( viewNode4 );
		this.viewDiv.appendChild( viewNode4 );

		var dialogDiv = document.createElement( 'div' );
		this.addDialog = new EDITOR.AddDialog( dialogDiv );
		this.node.appendChild( dialogDiv );

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

		var viewWidth = width - listWidth;
		this.viewDiv.style.width = viewWidth + 'px';
		this.viewDiv.style.height = height + 'px';

		var nw = Math.max( 100, 0.5 * viewWidth - 7 );
		var nh = Math.max( 100, 0.5 * height - 7 );
		this.view1.resize( nw, nh,    10,    10 );
		this.view2.resize( nw, nh, nw+22,    10 );
		this.view3.resize( nw, nh,    10, nh+22 );
		this.view4.resize( nw, nh, nw+22, nh+22 );

		this.addDialog.resize( window.innerWidth, window.innerHeight );

	},

	getRandomPointSetName: ( function () {
		var number = 0;
		return function () {
			number++;
			return 'RandomPointSet#' + number;
		};
	} )()

};


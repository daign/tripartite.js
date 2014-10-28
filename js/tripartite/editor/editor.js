EDITOR = {

	init: function () {

		var self = this;

		this.node = document.createElement( 'div' );
		this.node.setAttribute( 'class', 'page' );
		this.node.id = 'editor';
		document.body.appendChild( this.node );

		var onSwitch = function ( visible ) {
			if ( !visible ) {
				var sn = POINTS.storePermanent.getNumberOfSelected( 'singleSelected' );
				PAGES.SETTINGS.menu1pointsLabel2.innerHTML = 'custom (' + ( sn > 0 ? sn : 'none' ) + ' selected)';
				var mn = POINTS.storePermanent.getNumberOfSelected( 'multipleSelected' );
				PAGES.SETTINGS.menu2pointsLabel2.innerHTML = 'custom (' + ( mn > 0 ? mn : 'none' ) + ' selected)';
				PAGES.SETTINGS.updateDescriptions();
			}
		};
		PAGES.add( this.node, 'editor', onSwitch );

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
		this.setList = new EDITOR.PointSetList( listNode );

		this.viewDiv = document.createElement( 'div' );
		this.viewDiv.setAttribute( 'class', 'halfbox right' );
		this.viewDiv.style.background = '#aaa';
		this.node.appendChild( this.viewDiv );

		var viewNode1 = document.createElement( 'div' );
		this.view1 = new EDITOR.View2D( viewNode1, 'top' );
		this.viewDiv.appendChild( viewNode1 );

		var viewNode2 = document.createElement( 'div' );
		this.view2 = new EDITOR.View2D( viewNode2, 'front' );
		this.viewDiv.appendChild( viewNode2 );

		var viewNode3 = document.createElement( 'div' );
		this.view3 = new EDITOR.ViewInfos( viewNode3 );
		this.viewDiv.appendChild( viewNode3 );

		var viewNode4 = document.createElement( 'div' );
		this.view4 = new EDITOR.View3D( viewNode4 );
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


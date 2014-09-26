PAGES.VISU = {

	showIntersections: false,

	pointMaterials: [
		new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
		new THREE.MeshBasicMaterial( { color: 0xffff00 } ),
		new THREE.MeshBasicMaterial( { color: 0x0000ff } )
	],

	lineMaterials: [
		new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 1 } ),
		new THREE.LineBasicMaterial( { color: 0xffff00, linewidth: 1 } ),
		new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 1 } ),
		new THREE.LineBasicMaterial( { color: 0x999999, linewidth: 1 } )
	],

	triangleMaterials: {
		normal:      new THREE.MeshNormalMaterial(),
		highlighted: new THREE.MeshBasicMaterial( { color: 0xff0000 } )
	},

	init: function ( canvas ) {

		this.scene = ( function () {
			var s = {};
			s.scene = new THREE.Scene();
			s.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
			s.camera.position = new THREE.Vector3( 50, 50, 150 );

			var renderer = new THREE.WebGLRenderer( { canvas: canvas } );
			renderer.setSize( window.innerWidth, window.innerHeight );
			PAGES.SIMULATION.node.appendChild( renderer.domElement );
			function render() {
				if ( PAGES.SIMULATION.visualEnabled ) {
					renderer.render( s.scene, s.camera );
				}
			}

			var controls = new THREE.OrbitControls( s.camera, renderer.domElement );
			controls.target = new THREE.Vector3( 50, 50, 50 );
			controls.addEventListener( 'change', render );
			controls.update();

			s.callrender = function () {
				render();
			};
			s.resize = function () {
				s.camera.aspect = window.innerWidth / window.innerHeight;
				s.camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				render();
			};

			s.points = new THREE.Object3D();
			s.scene.add( s.points );
			s.triangles = new THREE.Object3D();
			s.scene.add( s.triangles );
			s.lines = new THREE.Object3D();
			s.scene.add( s.lines );

			s.removeAll = function () {
				while ( s.points.children.length > 0 ) {
					s.points.remove( s.points.children[ s.points.children.length-1 ] );
				}
				while ( s.triangles.children.length > 0 ) {
					s.triangles.remove( s.triangles.children[ s.triangles.children.length-1 ] );
				}
				while ( s.lines.children.length > 0 ) {
					s.lines.remove( s.lines.children[ s.lines.children.length-1 ] );
				}
			};

			return s;
		} )();

	},

	update: function () {
		if ( this.showIntersections ) {
			for ( var i = 0; i < TRIS.length; i++ ) {
				TRIS[ i ].setMaterial( false );
			}
			var intersects = COUNTING.getAllIntersectingTriangles( false )[ 1 ];
			for ( var i = 0; i < intersects.length; i++ ) {
				intersects[ i ].setMaterial( true );
			}
		}
		this.scene.callrender();
	},

	showLines: function ( b ) {
		for ( var i = 0; i < this.scene.lines.children.length; i++ ) {
			this.scene.lines.children[ i ].visible = b;
		}
		this.scene.callrender();
	},

	setShowIntersections: function ( b ) {
		this.showIntersections = b;
		if ( b ) {
			this.update();
		} else {
			for ( var i = 0; i < TRIS.length; i++ ) {
				TRIS[ i ].setMaterial( false );
			}
			this.scene.callrender();
		}
	}

};


VISUALISATION = {

	materialMode: 'standard',
	gabrielMode:  'all',

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

			s.lines = [
				new THREE.Object3D(),
				new THREE.Object3D(),
				new THREE.Object3D(),
				new THREE.Object3D()
			];
			s.lines.forEach( function ( element ) { s.scene.add( element ); } );

			s.removeAll = function () {
				while ( s.points.children.length > 0 ) {
					s.points.remove( s.points.children[ s.points.children.length-1 ] );
				}
				while ( s.triangles.children.length > 0 ) {
					s.triangles.remove( s.triangles.children[ s.triangles.children.length-1 ] );
				}
				s.lines.forEach( function ( element ) {
					while ( element.children.length > 0 ) {
						element.remove( element.children[ element.children.length-1 ] );
					}
				} );
			};

			return s;
		} )();

	},

	update: function () {
		if ( this.materialMode === 'intersections' ) {
			for ( var i = 0; i < TRIS.length; i++ ) {
				TRIS[ i ].setMaterial( VISUALISATION.MATERIALS.triangleMaterials.blue.shader );
			}
			var intersects = COUNTING.getAllIntersectingTriangles( false )[ 1 ];
			for ( var i = 0; i < intersects.length; i++ ) {
				intersects[ i ].setMaterial( VISUALISATION.MATERIALS.triangleMaterials.red.shader );
			}
		}
		this.scene.callrender();
	},

	setMaterialMode: function ( m ) {
		this.materialMode = m;
		if ( m === 'intersections' ) {
			this.update();
		} else if ( m === 'normal' ) {
			for ( var i = 0; i < TRIS.length; i++ ) {
				TRIS[ i ].setMaterial( VISUALISATION.MATERIALS.triangleMaterials.normal.shader );
			}
			this.scene.callrender();
		} else {
			for ( var i = 0; i < TRIS.length; i++ ) {
				TRIS[ i ].setMaterial( VISUALISATION.MATERIALS.triangleMaterials.blue.shader );
			}
			this.scene.callrender();
		}
	},

	setGabrielMode: function ( m ) {

		if ( m !== this.gabrielMode ) {
			this.gabrielMode = m;
			this.applyGabrielMode();
		}

	},

	applyGabrielMode: function () {

		var m = this.gabrielMode;

		this.scene.lines.forEach( function ( element ) {
			element.children.forEach( function ( line ) {
				line.visible = ( m === 'all' );
			} );
		} );

		var x = { red: 0, yellow: 1, green: 2, grey: 3, all: undefined, nothing: undefined }[ m ];
		if ( x !== undefined ) {
			this.scene.lines[ x ].children.forEach( function ( line ) {
				line.visible = true;
			} );
		}

		this.scene.callrender();

	}

};


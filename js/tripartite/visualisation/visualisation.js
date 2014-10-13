var VISUALISATION = {

	materialMode: 'standard',
	gabrielMode:  'all',
	showSwap: false,

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

			var swapLineGeometry = new THREE.Geometry();
			swapLineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );
			swapLineGeometry.computeLineDistances();
			s.swapLine = new THREE.Line( swapLineGeometry, VISUALISATION.MATERIALS.swapLineMaterial, THREE.LinePieces );
			s.swapLine.visible = false;
			s.scene.add( s.swapLine );

			var updateSwapLine = function ( v0, v1 ) {
				swapLineGeometry.vertices[ 0 ] = v0;
				swapLineGeometry.vertices[ 1 ] = v1;
				swapLineGeometry.verticesNeedUpdate = true;
				swapLineGeometry.computeLineDistances();
			};
			s.updateSwapLine = updateSwapLine;

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
				updateSwapLine( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );
			};

			s.removeTriangles = function () {
				while ( s.triangles.children.length > 0 ) {
					s.triangles.remove( s.triangles.children[ s.triangles.children.length-1 ] );
				}
			};

			return s;
		} )();

	},

	update: function () {
		if ( this.materialMode === 'intersections' ) {
			TRIANGLES.forEach( function ( triangle ) {
				triangle.setMaterial( VISUALISATION.MATERIALS.triangleMaterials.blue.shader );
			} );
			var intersects = COUNTING.getAllIntersectingTriangles( false )[ 1 ];
			intersects.forEach( function ( triangle ) {
				triangle.setMaterial( VISUALISATION.MATERIALS.triangleMaterials.red.shader );
			} );
		}
		this.scene.callrender();
	},

	setMaterialMode: function ( m ) {

		if ( m !== this.materialMode ) {
			this.materialMode = m;
			this.applyMaterialMode();
		}

	},

	applyMaterialMode: function () {

		var m = this.materialMode;

		if ( m === 'intersections' ) {
			this.update();
		} else if ( m === 'normal' ) {
			TRIANGLES.forEach( function ( triangle ) {
				triangle.setMaterial( VISUALISATION.MATERIALS.triangleMaterials.normal.shader );
			} );
			this.scene.callrender();
		} else if ( m === 'invisible' ) {
			TRIANGLES.forEach( function ( triangle ) {
				triangle.setMaterial( VISUALISATION.MATERIALS.triangleMaterials.invisible.shader );
			} );
			this.scene.callrender();
		} else {
			TRIANGLES.forEach( function ( triangle ) {
				triangle.setMaterial( VISUALISATION.MATERIALS.triangleMaterials.blue.shader );
			} );
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

	},

	setShowSwap: function ( b ) {

		if ( b !== this.showSwap ) {
			this.showSwap = b;
			this.scene.swapLine.visible = b;
			this.scene.callrender();
		}

	}

};


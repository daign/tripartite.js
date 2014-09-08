var VISU = {

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

	init: function () {

		this.scene = ( function () {
			var s = {};
			s.scene = new THREE.Scene();
			s.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
			s.camera.position = new THREE.Vector3( 50, 50, 150 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			SIMULATION.node.appendChild( renderer.domElement );
			function render() {
				if ( SIMULATION.enabled.visual ) {
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

			return s;
		} )();

	},

	update: function () {
		this.scene.callrender();
	},

	showLines: function ( b ) {
		for ( var i = 0; i < this.scene.lines.children.length; i++ ) {
			this.scene.lines.children[ i ].visible = b;
		}
	}

};


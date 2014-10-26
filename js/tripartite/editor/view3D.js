EDITOR.View3D = function ( node ) {

	var self = this;

	this.node = node;
	this.node.setAttribute( 'class', 'viewNode' );

	this.canvas = document.createElement( 'canvas' );
	this.node.appendChild( this.canvas );

	var scene = new THREE.Scene();

	this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	this.camera.position = new THREE.Vector3( 50, 50, 150 );

	this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas } );
	this.renderer.setSize( window.innerWidth, window.innerHeight );

	var render = function () {
		self.renderer.render( scene, self.camera );
	};
	this.render = render;

	var controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
	controls.target = new THREE.Vector3( 50, 50, 50 );
	controls.addEventListener( 'change', render );
	controls.update();

	this.points = new THREE.Object3D();
	scene.add( this.points );

};

EDITOR.View3D.prototype = {

	constructor: EDITOR.View3D,

	resize: function ( width, height, left, top ) {

		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left   = left   + 'px';
		this.node.style.top    = top    + 'px';

		this.canvas.width = width;
		this.canvas.height = height;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( width, height );
		this.render();

	},

	renderPointSet: function ( pointSet ) {

		while ( this.points.children.length > 0 ) {
			this.points.remove( this.points.children[ this.points.children.length-1 ] );
		}

		var self = this;

		pointSet.forEach( function ( point ) {
			var geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
			var mesh = new THREE.Mesh( geometry, VISUALISATION.MATERIALS.pointMaterialsEditor[ point.group ] );
			mesh.position = point.coords;
			self.points.add( mesh );
		} );

		this.render();

	}

};


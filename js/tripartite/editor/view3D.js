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

	this.points = [
		new THREE.Object3D(),
		new THREE.Object3D(),
		new THREE.Object3D()
	];
	this.points.forEach( function ( element ) {
		scene.add( element );
	} );

	var viewCaption = document.createElement( 'div' );
	viewCaption.setAttribute( 'class', 'viewCaption' );
	viewCaption.innerHTML = 'perspective';
	this.node.appendChild( viewCaption );

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

	loadPointSet: function () {

		var self = this;
		var indices = [ 0, 0, 0 ];

		EDITOR.PointSetModifier.forEach( function ( modifier ) {

			if ( modifier.active ) {

				var point = modifier.point;
				var g = point.group;
				var index = indices[ g ];
				var mesh = undefined;

				if ( self.points[ g ].children.length <= index ) {
					var geometry = new THREE.SphereGeometry( 1, 16, 16 );
					mesh = new THREE.Mesh( geometry, VISUALISATION.MATERIALS.pointMaterialsEditor[ g ] );
					self.points[ g ].add( mesh );
				} else {
					mesh = self.points[ g ].children[ index ];
					mesh.visible = true;
				}

				var setPosition = function () {
					mesh.position = point.coords;
					self.render();
				};
				setPosition();
				modifier.registerListener( setPosition );

				indices[ g ]++;

			}

		} );

		this.points.forEach( function ( element, index ) {

			while ( indices[ index ] < element.children.length ) {
				element.children[ indices[ index ] ].visible = false;
				indices[ index ]++;
			}

		} );

		this.render();

	}

};


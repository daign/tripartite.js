var VISUALISATION = function ( canvas ) {

	this.enabled = false;

	this.materialMode = 'standard';
	this.gabrielMode = 'all';
	this.showSwap = false;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position = new THREE.Vector3( 50, 50, 150 );

	var renderer = new THREE.WebGLRenderer( { canvas: canvas } );
	renderer.setSize( window.innerWidth, window.innerHeight );

	var render = function () {
		if ( this.enabled ) {
			renderer.render( scene, camera );
		}
	};
	this.render = render;

	var resize = function () {
		if ( this.enabled ) {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			render();
		}
	};
	this.resize = resize;

	window.addEventListener( 'resize', resize, false );

	var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.target = new THREE.Vector3( 50, 50, 50 );
	controls.addEventListener( 'change', render );
	controls.update();

	this.points = new THREE.Object3D();
	scene.add( this.points );
	this.triangles = new THREE.Object3D();
	scene.add( this.triangles );

	this.lines = [
		new THREE.Object3D(),
		new THREE.Object3D(),
		new THREE.Object3D(),
		new THREE.Object3D()
	];
	this.lines.forEach( function ( element ) {
		scene.add( element );
	} );

	var swapLineGeometry = new THREE.Geometry();
	swapLineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );
	swapLineGeometry.computeLineDistances();

	this.swapLine = new THREE.Line( swapLineGeometry, VISUALISATION.MATERIALS.swapLineMaterial, THREE.LinePieces );
	this.swapLine.visible = false;
	scene.add( this.swapLine );

	var updateSwapLine = function ( v0, v1 ) {
		swapLineGeometry.vertices[ 0 ] = v0;
		swapLineGeometry.vertices[ 1 ] = v1;
		swapLineGeometry.verticesNeedUpdate = true;
		swapLineGeometry.computeLineDistances();
	};
	this.updateSwapLine = updateSwapLine;

	this.removeAll = function () {
		while ( this.points.children.length > 0 ) {
			this.points.remove( this.points.children[ this.points.children.length-1 ] );
		}
		while ( this.triangles.children.length > 0 ) {
			this.triangles.remove( this.triangles.children[ this.triangles.children.length-1 ] );
		}
		this.lines.forEach( function ( element ) {
			while ( element.children.length > 0 ) {
				element.remove( element.children[ element.children.length-1 ] );
			}
		} );
		updateSwapLine( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );
	};

	this.removeTriangles = function () {
		while ( this.triangles.children.length > 0 ) {
			this.triangles.remove( this.triangles.children[ this.triangles.children.length-1 ] );
		}
	};

};

VISUALISATION.prototype = {

	constructor: VISUALISATION,

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

		this.render();

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
			this.render();
		} else if ( m === 'invisible' ) {
			TRIANGLES.forEach( function ( triangle ) {
				triangle.setMaterial( VISUALISATION.MATERIALS.triangleMaterials.invisible.shader );
			} );
			this.render();
		} else {
			TRIANGLES.forEach( function ( triangle ) {
				triangle.setMaterial( VISUALISATION.MATERIALS.triangleMaterials.blue.shader );
			} );
			this.render();
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

		this.lines.forEach( function ( element ) {
			element.children.forEach( function ( line ) {
				line.visible = ( m === 'all' );
			} );
		} );

		var x = { red: 0, yellow: 1, green: 2, grey: 3, all: undefined, nothing: undefined }[ m ];
		if ( x !== undefined ) {
			this.lines[ x ].children.forEach( function ( line ) {
				line.visible = true;
			} );
		}

		this.render();

	},

	setShowSwap: function ( b ) {

		if ( b !== this.showSwap ) {
			this.showSwap = b;
			this.swapLine.visible = b;
			this.render();
		}

	}

};


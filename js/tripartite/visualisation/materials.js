VISUALISATION.MATERIALS = {

	pointMaterials: [
		new THREE.MeshBasicMaterial( { color: 0xcc0000 } ),
		new THREE.MeshBasicMaterial( { color: 0xffcc00 } ),
		new THREE.MeshBasicMaterial( { color: 0x006600 } )
	],

	lineMaterials: [
		new THREE.LineBasicMaterial( { color: 0xcc0000, linewidth: 1 } ),
		new THREE.LineBasicMaterial( { color: 0xffcc00, linewidth: 1 } ),
		new THREE.LineBasicMaterial( { color: 0x006600, linewidth: 1 } ),
		new THREE.LineBasicMaterial( { color: 0x666666, linewidth: 1 } )
	],

	triangleMaterials: {
		blue:   new VISUALISATION.ShaderMaterial( 0, new THREE.Color( 0x0000ff ), 1.0 ),
		red:    new VISUALISATION.ShaderMaterial( 0, new THREE.Color( 0xff0000 ), 1.0 ),
		normal: new VISUALISATION.ShaderMaterial( 1, new THREE.Color( 0xffffff ), 1.0 )
	}

};


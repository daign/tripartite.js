VISUALISATION.MATERIALS = {

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
		normal:      new VISUALISATION.ShaderMaterial( new THREE.Color( 0x0000ff ), 1.0 ),
		highlighted: new VISUALISATION.ShaderMaterial( new THREE.Color( 0xff0000 ), 1.0 )
	}

};


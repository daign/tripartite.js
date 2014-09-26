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
		normal:      new THREE.MeshNormalMaterial(),
		highlighted: new THREE.MeshBasicMaterial( { color: 0xff0000 } )
	}

};


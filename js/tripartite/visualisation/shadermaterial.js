VISUALISATION.ShaderMaterial = function ( color, transparency ) {

	var uniforms = {
		color:        { type: "c", value: color },
		transparency: { type: "f", value: transparency }
	};
	this.uniforms = uniforms;

	this.shader = new THREE.ShaderMaterial( {

		uniforms:       uniforms,
		vertexShader:   VISUALISATION.SHADERS[ "vertexShader" ],
		fragmentShader: VISUALISATION.SHADERS[ "fragmentShader" ],
		transparent:    true

	} );

};

VISUALISATION.ShaderMaterial.prototype = {

	constructor: VISUALISATION.ShaderMaterial,

	setTransparency: function ( v ) {
		this.uniforms.transparency.value = v;
	}

};


VISUALISATION.SHADERS = {

	vertexShader: [

		"uniform   int normalMaterial;",
		"uniform  vec3 color;",
		"uniform float transparency;",

		"varying vec3 pixelNormal;",
		"varying vec3 vNormal;",

		"void main() {",

			"pixelNormal = normal;",
			"vNormal = normalize( normalMatrix * normal );",
			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform   int normalMaterial;",
		"uniform  vec3 color;",
		"uniform float transparency;",

		"varying vec3 pixelNormal;",
		"varying vec3 vNormal;",

		"void main( void ) {",

			"if ( transparency < 0.01 ) {",

				"discard;",

			"} else if ( normalMaterial == 1 ) {",

				"gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, transparency );",

			"} else {",

				"float shade = (	3.0 * pow ( abs ( pixelNormal.z ), 2.0 ) + \
									2.0 * pow ( abs ( pixelNormal.y ), 2.0 ) + \
									1.0 * pow ( abs ( pixelNormal.x ), 2.0 ) ) / 3.0;",

				"gl_FragColor = vec4( color * shade, transparency );",

			"}",

		"}"

	].join("\n")

};


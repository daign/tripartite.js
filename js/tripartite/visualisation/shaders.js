VISUALISATION.SHADERS = {

	vertexShader: [

		"uniform  vec3 color;",
		"uniform float transparency;",

		"varying vec3 pixelNormal;",

		"void main() {",

			"pixelNormal = normal;",
			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"gl_Position = projectionMatrix * mvPosition;",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform  vec3 color;",
		"uniform float transparency;",

		"varying vec3 pixelNormal;",

		"void main( void ) {",

			"if ( transparency < 0.01 ) {",

				"discard;",

			"} else {",

				"float shade = (	3.0 * pow ( abs ( pixelNormal.z ), 2.0 ) + \
									2.0 * pow ( abs ( pixelNormal.y ), 2.0 ) + \
									1.0 * pow ( abs ( pixelNormal.x ), 2.0 ) ) / 3.0;",

				"gl_FragColor = vec4( color * shade, transparency );",

			"}",

		"}"

	].join("\n")

};


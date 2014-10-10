var ALGORITHMS = {

	onFinish: undefined,
	getMeasure: undefined,

	run: function ( triangleBuildFunction, swappingFunction, optimizationFunction, onFinish ) {
		ALGORITHMS.onFinish = onFinish;
		ALGORITHMS.getMeasure = ALGORITHMS.OPTIMIZATIONMEASURE[ optimizationFunction ].get;
		ALGORITHMS.TRIANGLEBUILD[ triangleBuildFunction ].run( swappingFunction );
	}

};


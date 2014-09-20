var ALGO = {

	onFinish: undefined,
	getMeasure: undefined,

	run: function ( triangleBuildFunction, swappingFunction, optimizationFunction, onFinish ) {
		ALGO.onFinish = onFinish;
		ALGO.getMeasure = ALGO.OPTIMIZATIONMEASURE[ optimizationFunction ].get;
		ALGO.TRIANGLEBUILD[ triangleBuildFunction ].run( swappingFunction );
	}

};


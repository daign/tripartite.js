var ALGO = {

	interval: undefined,
	speedInterval: undefined,
	onFinish: undefined,
	getMeasure: undefined,

	run: function ( triangleBuildFunction, swappingFunction, optimizationFunction, speedInterval, onFinish ) {
		ALGO.speedInterval = speedInterval;
		ALGO.onFinish = onFinish;
		ALGO.getMeasure = ALGO.OPTIMIZATIONMEASURE[ optimizationFunction ].get;
		ALGO.TRIANGLEBUILD[ triangleBuildFunction ].run( swappingFunction );
	}

};


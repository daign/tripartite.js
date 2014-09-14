var ALGO = {

	onFinish: undefined,
	getMeasure: undefined,

	run: function ( triangleBuildFunction, swappingFunction, optimizationFunction, speedInterval, onFinish ) {
		TIMECONTROL.setSpeed( ALGO.speedInterval );
		ALGO.onFinish = onFinish;
		ALGO.getMeasure = ALGO.OPTIMIZATIONMEASURE[ optimizationFunction ].get;
		ALGO.TRIANGLEBUILD[ triangleBuildFunction ].run( swappingFunction );
	}

};


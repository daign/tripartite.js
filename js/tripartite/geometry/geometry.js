GEOMETRY = {

	swapPoints: function ( triangle1, triangle2, pointGroup, counting, testSwap ) {

		triangle1.swapPoint( triangle2, pointGroup );

		if ( !testSwap ) {
			VISUALISATION.scene.updateSwapLine(
				triangle1.points[ pointGroup ].getVector(),
				triangle2.points[ pointGroup ].getVector()
			);
		}

		if ( counting ) {
			if ( testSwap ) {
				STATISTICS.count( 'testswaps' );
			} else {
				STATISTICS.count( 'swaps' );
			}
		}

	}

};


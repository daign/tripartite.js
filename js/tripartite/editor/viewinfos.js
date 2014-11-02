EDITOR.ViewInfos = function ( node ) {

	this.node = node;
	this.node.setAttribute( 'class', 'viewNode' );
	this.node.style.overflowY = 'auto';

	this.list = document.createElement( 'ul' );
	this.list.style.display = 'none';
	this.node.appendChild( this.list );

	this.groupSize = document.createElement( 'li' );
	this.list.appendChild( this.groupSize );
	this.groupSizeValid = document.createElement( 'li' );
	this.list.appendChild( this.groupSizeValid );
	this.doublePoints = document.createElement( 'li' );
	this.list.appendChild( this.doublePoints );

	var doublePointsList = document.createElement( 'ul' );
	this.list.appendChild( doublePointsList );
	var doublePoints2 = document.createElement( 'li' );
	doublePointsList.appendChild( doublePoints2 );
	this.doublePointsButton = document.createElement( 'input' );
	this.doublePointsButton.type = 'button';
	this.doublePointsButton.value = 'Remove double points';
	var onRemoveDoublePoints = function () {
		EDITOR.PointSetModifier.pointSet.removeDoublePoints();
		EDITOR.PointSetModifier.set( EDITOR.PointSetModifier.pointSet );
	};
	this.doublePointsButton.addEventListener( 'click', onRemoveDoublePoints, false );
	doublePoints2.appendChild( this.doublePointsButton );

};

EDITOR.ViewInfos.prototype = {

	constructor: EDITOR.ViewInfos,

	resize: function ( width, height, left, top ) {

		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left   = left   + 'px';
		this.node.style.top    = top    + 'px';

	},

	loadPointSet: function () {

		var pointSet = EDITOR.PointSetModifier.pointSet;
		var self = this;
		this.list.style.display = 'block';

		var update = function () {

			self.groupSize.innerHTML = (
				  pointSet.points.length + ' points ('
				+ pointSet.getGroupSize( 0 ) + ' red,'
				+ pointSet.getGroupSize( 1 ) + ' yellow,'
				+ pointSet.getGroupSize( 2 ) + ' green)'
			);

			self.groupSizeValid.innerHTML = (
				pointSet.hasEqualSizedGroups() ? 'groups are equal sized' : 'groups are NOT equal sized (invalid)'
			);

			if ( pointSet.hasDoublePoints() ) {
				self.doublePoints.innerHTML = 'does contain double points (invalid)';
				self.doublePointsButton.disabled = false;
			} else {
				self.doublePoints.innerHTML = 'all points are distinct';
				self.doublePointsButton.disabled = true;
			}

		};
		update();
		EDITOR.PointSetModifier.registerChangeListener( update, window );

	}

};


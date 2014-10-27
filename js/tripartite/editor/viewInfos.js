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

};

EDITOR.ViewInfos.prototype = {

	constructor: EDITOR.ViewInfos,

	resize: function ( width, height, left, top ) {

		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.node.style.left   = left   + 'px';
		this.node.style.top    = top    + 'px';

	},

	setPointSet: function ( pointSet ) {

		this.list.style.display = 'block';

		this.groupSize.innerHTML = (
			  pointSet.points.length + ' points ('
			+ pointSet.getGroupSize( 0 ) + ' red,'
			+ pointSet.getGroupSize( 1 ) + ' yellow,'
			+ pointSet.getGroupSize( 2 ) + ' green)'
		);

		this.groupSizeValid.innerHTML = (
			pointSet.hasEqualSizedGroups() ? 'groups are equal sized' : 'groups are NOT equal sized (invalid)'
		);

		this.doublePoints.innerHTML = (
			pointSet.hasDoublePoints() ? 'does contain double points (invalid)' : 'all points are distinct'
		);

	}

};


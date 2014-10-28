THREE.Vector2.prototype.setFromEvent = function ( event ) {

	this.x = event.clientX;
	this.y = event.clientY;

	return this;

};


EDITOR.AddDialog = function ( node ) {

	var self = this;

	this.parsedPointSet = null;

	this.node = node;
	this.node.setAttribute( 'class', 'dialogNode' );

	var overlay = document.createElement( 'div' );
	overlay.setAttribute( 'class', 'dialogOverlay' );
	this.node.appendChild( overlay );

	this.box = document.createElement( 'div' );
	this.box.setAttribute( 'class', 'box dialogBox' );
	this.node.appendChild( this.box );

	var header = document.createElement( 'div' );
	header.setAttribute( 'class', 'boxheader' );
	header.innerHTML = 'Add Point Set';
	this.box.appendChild( header );

	this.sourceRadio1 = document.createElement( 'input' );
	this.sourceRadio1.id = 'sourceRadio1';
	this.sourceRadio1.type = 'radio';
	this.sourceRadio1.name = 'sourceSelect';
	this.sourceRadio1.checked = true;
	this.box.appendChild( this.sourceRadio1 );
	this.sourceRadio1.addEventListener( 'change', function () { self.setAddButtonState(); }, false );

	var sourceLabel1 = document.createElement( 'label' );
	sourceLabel1.innerHTML = 'Random: ';
	sourceLabel1.htmlFor = this.sourceRadio1.id;
	this.box.appendChild( sourceLabel1 );
	this.sel1 = new PAGES.SELECT( this.box, false, 0, null, [
		[ '10', '3x10' ],
		[ '30', '3x30' ],
		[ '60', '3x60' ]
	] );

	this.box.appendChild( document.createElement( 'br' ) );
	this.sourceRadio2 = document.createElement( 'input' );
	this.sourceRadio2.id = 'sourceRadio2';
	this.sourceRadio2.type = 'radio';
	this.sourceRadio2.name = 'sourceSelect';
	this.sourceRadio2.style.marginTop = '15px';
	this.box.appendChild( this.sourceRadio2 );
	this.sourceRadio2.addEventListener( 'change', function () { self.setAddButtonState(); }, false );

	var sourceLabel2 = document.createElement( 'label' );
	sourceLabel2.innerHTML = 'Upload file: ';
	sourceLabel2.htmlFor = this.sourceRadio2.id;
	this.box.appendChild( sourceLabel2 );

	this.parseInformation = document.createElement( 'div' );
	this.parseInformation.setAttribute( 'class', 'description' );
	this.parseInformation.style.marginTop = '5px';
	this.parseInformation.style.marginLeft = '40px';

	if ( window.File && window.FileReader && window.FileList && window.Blob ) {

		this.fileUploader = document.createElement( 'input' );
		this.fileUploader.type = 'file';
		this.box.appendChild( this.fileUploader );

		var readFile = function ( event ) {
			var file = event.target.files[ 0 ];
			if ( file ) {
				var reader = new FileReader();
				reader.onload = function( event ) {
					var pointSet = new GEOMETRY.PointSet();
					var success = pointSet.parseFromFile( event.target.result );
					if ( success ) {
						self.parsedPointSet = pointSet;
						self.parsedPointSet.name = file.name;
						var n = pointSet.points.length;
						self.parseInformation.innerHTML = 'parse status: successfully parsed ' + n + ' points';
						self.setAddButtonState();
					} else {
						self.parsedPointSet = null;
						self.parseInformation.innerHTML = 'parse status: error while parsing points';
						self.setAddButtonState();
					}
				};
				reader.readAsText( file );
			}
		};
		this.fileUploader.addEventListener( 'change', readFile, false );

	} else {

		this.sourceRadio2.disabled = true;
		this.fileUploader = {};
		this.box.appendChild( document.createTextNode( 'not supported by your browser' ) );
		this.parseInformation.style.display = 'none';
		this.box.appendChild( document.createElement( 'br' ) );

	}

	this.box.appendChild( this.parseInformation );

	this.box.appendChild( document.createElement( 'br' ) );
	var cancelButton = document.createElement( 'input' );
	cancelButton.type = 'button';
	cancelButton.value = 'Cancel';
	var onCancel = function () {
		self.display( false );
	};
	cancelButton.addEventListener( 'click', onCancel, false );
	this.box.appendChild( cancelButton );

	this.addButton = document.createElement( 'input' );
	this.addButton.type = 'button';
	this.addButton.value = 'Add';
	var onAdd = function () {
		if ( self.sourceRadio1.checked ) {
			var pointSet = new GEOMETRY.PointSet();
			pointSet.generateRandom( parseInt( self.sel1.get() ) );
			pointSet.name = EDITOR.getRandomPointSetName();
			POINTS.storePermanent.addPointSet( pointSet );
			EDITOR.setList.update();
			self.display( false );
		} else if ( self.sourceRadio2.checked && self.parsedPointSet !== null ) {
			POINTS.storePermanent.addPointSet( self.parsedPointSet.clone() );
			EDITOR.setList.update();
			self.display( false );
		}
	};
	this.addButton.addEventListener( 'click', onAdd, false );
	this.box.appendChild( this.addButton );

};

EDITOR.AddDialog.prototype = {

	constructor: EDITOR.AddDialog,

	resize: function ( width, height ) {
		this.node.style.width  = width  + 'px';
		this.node.style.height = height + 'px';
		this.box.style.left = ( 0.5 * width - 250 ) + 'px';
	},

	display: function ( b ) {
		this.fileUploader.value = null;
		this.parsedPointSet = null;
		this.parseInformation.innerHTML = 'parse status: no input file';
		this.setAddButtonState();
		this.node.style.display = b ? 'block' : 'none';
	},

	setAddButtonState: function () {
		if ( this.sourceRadio1.checked ) {
			this.addButton.disabled = false;
		} else if ( this.sourceRadio2.checked && this.parsedPointSet !== null ) {
			this.addButton.disabled = false;
		} else {
			this.addButton.disabled = true;
		}
	}

};


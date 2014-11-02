EDITOR.PointSetListEntry = function ( parent ) {

	var self = this;

	this.store = POINTS.storePermanent;
	this.index = undefined;

	this.node = document.createElement( 'div' );
	this.node.setAttribute( 'class', 'listEntry' );
	parent.appendChild( this.node );

	this.inputBox = document.createElement( 'div' );
	this.inputBox.setAttribute( 'class', 'listEntryBox' );
	this.inputBox.style.width = '30px';
	this.node.appendChild( this.inputBox );

	this.radioInput = document.createElement( 'input' );
	this.radioInput.type = 'radio';
	this.radioInput.name = 'singlePointSetSelect';
	this.radioInput.style.display = 'none';
	this.radioInput.setAttribute( 'class', 'listEntryInput' );
	this.inputBox.appendChild( this.radioInput );
	var onSingleSelect = function () {
		self.store.deselectAll( 'singleSelected' );
		self.store.entries[ self.index ].singleSelected = self.radioInput.checked;
	};
	this.radioInput.addEventListener( 'change', onSingleSelect, false );

	this.checkboxInput = document.createElement( 'input' );
	this.checkboxInput.type = 'checkbox';
	this.checkboxInput.style.display = 'none';
	this.checkboxInput.setAttribute( 'class', 'listEntryInput' );
	this.inputBox.appendChild( this.checkboxInput );
	var onMultipleSelect = function () {
		self.store.entries[ self.index ].multipleSelected = self.checkboxInput.checked;
	};
	this.checkboxInput.addEventListener( 'change', onMultipleSelect, false );

	this.infoBox = document.createElement( 'div' );
	this.infoBox.setAttribute( 'class', 'listEntryBox' );
	this.infoBox.style.width = '145px';
	this.infoBox.style.cursor = 'pointer';
	this.node.appendChild( this.infoBox );

	this.nameEdit = document.createElement( 'input' );
	this.nameEdit.type = 'text';
	this.nameEdit.setAttribute( 'class', 'listEntryEdit' );
	this.infoBox.appendChild( this.nameEdit );

	var onNameEdit = function () {
		self.store.entries[ self.index ].pointSet.name = self.nameEdit.value;
	};
	this.nameEdit.addEventListener( 'change', onNameEdit, false );
	this.nameEdit.addEventListener( 'click', function ( e ) { e.stopPropagation(); }, false );

	this.textDiv = document.createElement( 'div' );
	this.textDiv.setAttribute( 'class', 'listEntryText' );
	this.infoBox.appendChild( this.textDiv );

	this.duplicateButton = document.createElement( 'img' );
	this.duplicateButton.src = 'images/duplicate.png';
	this.duplicateButton.setAttribute( 'class', 'listEntryButton' );
	this.duplicateButton.style.left = '79px';
	this.duplicateButton.title = 'duplicate';
	this.infoBox.appendChild( this.duplicateButton );

	var onDuplicate = function ( event ) {
		event.stopPropagation();
		var duplicate = self.store.entries[ self.index ].pointSet.clone();
		self.store.addPointSet( duplicate );
		EDITOR.setList.update();
	};
	this.duplicateButton.addEventListener( 'click', onDuplicate, false );

	this.downloadButton = document.createElement( 'img' );
	this.downloadButton.src = 'images/download.png';
	this.downloadButton.setAttribute( 'class', 'listEntryButton' );
	this.downloadButton.style.left = '101px';
	this.downloadButton.title = 'download';
	this.infoBox.appendChild( this.downloadButton );

	var onDownload = function ( event ) {
		event.stopPropagation();
		var text = self.store.entries[ self.index ].pointSet.exportToFile();
		var filename = self.store.entries[ self.index ].pointSet.name;
		var blob = new Blob( [ text ], { type: 'text/plain;charset=utf-8' } );
		saveAs( blob, filename );
	};
	this.downloadButton.addEventListener( 'click', onDownload, false );

	this.deleteButton = document.createElement( 'img' );
	this.deleteButton.src = 'images/delete.png';
	this.deleteButton.setAttribute( 'class', 'listEntryButton' );
	this.deleteButton.style.left = '123px';
	this.deleteButton.title = 'delete';
	this.infoBox.appendChild( this.deleteButton );

	var onDelete = function ( event ) {
		event.stopPropagation();
		self.store.entries[ self.index ].pointSet.clear();
		self.store.entries.splice( self.index, 1 );
		EDITOR.setList.update();
	};
	this.deleteButton.addEventListener( 'click', onDelete, false );

	var onClick = function () {
		EDITOR.setList.deactivateAll();
		self.store.entries[ self.index ].viewSelected = true;
		self.activate( true );
	};
	this.infoBox.addEventListener( 'click', onClick, false );

};

EDITOR.PointSetListEntry.prototype = {

	constructor: EDITOR.PointSetListEntry,

	set: function ( index, selectMode ) {
		this.index = index;
		var entry = this.store.entries[ index ];
		var self = this;

		this.nameEdit.value = entry.pointSet.name;

		var update = function () {
			entry.update();
			if ( entry.isValid ) {
				self.textDiv.style.color = '#444';
				self.textDiv.style.fontWeight = 'normal';
				self.textDiv.innerHTML = entry.pointSet.points.length + ' Points';
			} else {
				self.textDiv.style.color = '#f55';
				self.textDiv.style.fontWeight = 'bold';
				self.textDiv.innerHTML = 'INVALID';
			}

			self.radioInput.disabled = !entry.isValid;
			self.checkboxInput.disabled = !entry.isValid;
			self.radioInput.checked = entry.singleSelected;
			self.checkboxInput.checked = entry.multipleSelected;
		};
		this.update = update;
		update();

		this.activate( entry.viewSelected );

		this.radioInput.style.display = 'none';
		this.checkboxInput.style.display = 'none';
		if ( selectMode === 'single' ) {
			this.radioInput.style.display = 'block';
		} else if ( selectMode === 'multiple' ) {
			this.checkboxInput.style.display = 'block';
		}

		this.display( true );
	},

	display: function ( b ) {
		this.node.style.display = ( b ? 'block' : 'none' );
	},

	activate: function ( b ) {
		this.infoBox.style.background = ( b ? 'linear-gradient( #adf, #7be )' : 'linear-gradient( #eee, #ddd )' );
		if ( b ) {
			EDITOR.PointSetModifier.set( this.store.entries[ this.index ].pointSet );
			EDITOR.PointSetModifier.registerChangeListener( this.update, this );
		}
	}

};


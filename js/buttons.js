var buttons = {
	init: function() {
		tool.tools = document.querySelector('.tool');
		tool.subTools = document.querySelector('.subtools');

		tool.buttons.close = document.getElementById('close');
		tool.buttons.close.addEventListener('click', menu.closeImage);

		tool.buttons.undo = document.getElementById('undo');
		tool.buttons.undo.addEventListener('click', undo.undo);

		tool.buttons.redo = document.getElementById('redo');
		tool.buttons.redo.addEventListener('click', undo.redo);

		tool.buttons.export = document.getElementById('export');
	  	tool.buttons.export.addEventListener('click', fileexport.export);
		if (!fileexport.canShare()) {
			tool.buttons.export.classList.remove('iconShare');
			tool.buttons.export.classList.add('iconDownload');
		}

		tool.buttons.options = document.getElementById('options');
		tool.buttons.options.addEventListener('click', menu.showOptionsMenu);

		tool.buttons.optionsClose = document.getElementById('optionsClose');
		tool.buttons.optionsClose.addEventListener('click', dialog.close);

		tool.buttons.palette = document.getElementById('palette');
		tool.buttons.palette.addEventListener('click', colors.openPalette);

		tool.buttons.brush = document.getElementById('brush');
		tool.buttons.brush.addEventListener('click', buttons.nothing);

		tool.buttons.pen = document.getElementById('pen');
		tool.buttons.pen.addEventListener('click', buttons.nothing);

		tool.buttons.colorSwatch = document.getElementsByClassName('swatch');
		for (var s = 0; s < tool.buttons.colorSwatch.length; ++s) {
			tool.buttons.colorSwatch[s].addEventListener('click', colors.setWithThis);
		}
		colors.init();
	},

	update: function() {
		tool.buttons.undo.disabled = tool.history.undo.length === 0;
		tool.buttons.redo.disabled = tool.history.redo.length === 0;
	},

	nothing: function() {
		console.log('-');
	},

};

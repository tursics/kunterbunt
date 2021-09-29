var buttons = {
	init: function() {
		tool.buttons.undo = document.getElementById('undo');
		tool.buttons.undo.addEventListener('click', undo.undo);

		tool.buttons.redo = document.getElementById('redo');
		tool.buttons.redo.addEventListener('click', undo.redo);

		tool.buttons.colorSwatch = document.getElementsByClassName('swatch');
		for (var s = 0; s < tool.buttons.colorSwatch.length; ++s) {
			tool.buttons.colorSwatch[s].addEventListener('click', colors.setWithThis);
		}
		colors.setWithObject(tool.buttons.colorSwatch[0]);
	},

	update: function() {
		tool.buttons.undo.disabled = tool.history.undo.length === 0;
		tool.buttons.redo.disabled = tool.history.redo.length === 0;
	},
};

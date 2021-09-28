var buttons = {
	init: function() {
		tool.buttons.undo = document.getElementById('undo');
		tool.buttons.undo.addEventListener('click', undo.undo);

		tool.buttons.redo = document.getElementById('redo');
		tool.buttons.redo.addEventListener('click', undo.redo);
	},

	update: function() {
		tool.buttons.undo.disabled = tool.history.undo.length === 0;
		tool.buttons.redo.disabled = tool.history.redo.length === 0;
	},
};

var buttons = {
	update: function() {
		tool.buttons.undo.disabled = tool.history.undo.length === 0;
		tool.buttons.redo.disabled = tool.history.redo.length === 0;
	},
};

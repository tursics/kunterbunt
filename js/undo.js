var undo = {
	reset: function() {
		tool.history.undo = [];
		tool.history.redo = [];

		buttons.update();
	},

	push: function(path) {
		tool.history.undo.push({
			path: path,
			props: path.getAttribute('style'),
		});
		tool.history.redo = [];

		buttons.update();
	},

	undo: function() {
		var action = tool.history.undo.pop();
		tool.history.redo.push({
			path: action.path,
			props: action.path.getAttribute('style'),
		});
		buttons.update();

		action.path.setAttribute('style', action.props);
	},

	redo: function() {
		var action = tool.history.redo.pop();
		tool.history.undo.push({
			path: action.path,
			props: action.path.getAttribute('style'),
		});
		buttons.update();

		action.path.setAttribute('style', action.props);
	},
};

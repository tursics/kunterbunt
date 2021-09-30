var buttons = {
	init: function() {
		tool.buttons.undo = document.getElementById('undo');
		tool.buttons.undo.addEventListener('click', undo.undo);

		tool.buttons.redo = document.getElementById('redo');
		tool.buttons.redo.addEventListener('click', undo.redo);

		tool.subTools = document.querySelector('.subtools');

		tool.buttons.brush = document.getElementById('brush');
		tool.buttons.brush.addEventListener('click', buttons.toggleSubTools);

		tool.buttons.colorSwatch = document.getElementsByClassName('swatch');
		for (var s = 0; s < tool.buttons.colorSwatch.length; ++s) {
			tool.buttons.colorSwatch[s].addEventListener('click', colors.setWithThis);
		}
		colors.setWithObject(tool.buttons.colorSwatch[0]);

		tool.buttons.positionNav = document.getElementById('positionNav');
		tool.buttons.positionNav.addEventListener('click', buttons.moveNavigation);
		buttons.moveNavigation();
	},

	update: function() {
		tool.buttons.undo.disabled = tool.history.undo.length === 0;
		tool.buttons.redo.disabled = tool.history.redo.length === 0;
	},

	toggleSubTools: function() {
		tool.subTools.classList.toggle('expanded');
	},

	moveNavigation: function() {
		if (tool.navigation === 'left') {
			document.body.classList.remove('toolLeft');
			document.body.classList.add('toolTop');
			tool.navigation = 'top';
		} else if (tool.navigation === 'top') {
			document.body.classList.remove('toolTop');
			document.body.classList.add('toolRight');
			tool.navigation = 'right';
		} else if (tool.navigation === 'right') {
			document.body.classList.remove('toolRight');
			document.body.classList.add('toolBottom');
			tool.navigation = 'bottom';
		} else if (tool.navigation === 'bottom') {
			document.body.classList.remove('toolBottom');
			document.body.classList.add('toolLeft');
			tool.navigation = 'left';
		} else {
			document.body.classList.remove('toolNone');
			document.body.classList.add('toolLeft');
			tool.navigation = 'left';
		}
	},
};

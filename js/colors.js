var colors = {
	init: function() {
		var id = 1;
		var palette = tool.colorPalette[id].colors;
		for (var s = 0; s < tool.buttons.colorSwatch.length; ++s) {
			tool.buttons.colorSwatch[s].style.backgroundColor = palette[s];
			tool.buttons.colorSwatch[s].style.display = s < palette.length ? 'inline-block' : 'none';
		}
		colors.setWithObject(tool.buttons.colorSwatch[0]);
	},

	setWithObject: function(obj) {
		var actives = document.getElementsByClassName('active');
		if (actives.length > 0) {
			actives[0].classList.remove('active');
		}
		obj.classList.add('active');
		tool.color = window.getComputedStyle(obj).getPropertyValue('background-color');
	},

	setWithThis: function() {
		colors.setWithObject(this);
	},

	openPalette: function() {
		showDialog('palette');
	},
};

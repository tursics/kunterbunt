var colors = {
	init: function() {
		tool.colorPalette = ['#66545e', '#a39193', '#aa6f73', '#eea990', '#f6e0b5'];
		for (var s = 0; s < tool.buttons.colorSwatch.length; ++s) {
			tool.buttons.colorSwatch[s].style.backgroundColor = tool.colorPalette[s];
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

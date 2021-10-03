var colors = {
	init: function() {
		dialog.push(document.querySelector('.dialog .palette'));

		colors.selectPaletteById(1);
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

	selectPaletteById: function(id) {
		var palette = tool.colorPalette[id].colors;
		for (var s = 0; s < tool.buttons.colorSwatch.length; ++s) {
			tool.buttons.colorSwatch[s].style.backgroundColor = palette[s];
			tool.buttons.colorSwatch[s].style.display = s < palette.length ? 'inline-block' : 'none';
		}
		colors.setWithObject(tool.buttons.colorSwatch[0]);
	},

	selectPalette: function(id) {
		dialog.close();
		colors.selectPaletteById(id);
	},

	generateSVGPalette: function(colorPalette) {
		var svg = '<svg viewBox="0 0 100 25" preserveAspectRatio="none">';
		var width = 100 / colorPalette.colors.length;

		for (var c = 0; c < colorPalette.colors.length; ++c) {
			var color = colorPalette.colors[c];
			svg += '<rect x="' + (c * width) + '" y="0" width="' + width + '" height="25" style="fill:' + color + '"/>';
		}

		svg += '</svg>';
		return svg;
	},

	openPalette: function() {
		var html = '';

		for (var c = 0; c < tool.colorPalette.length; ++c) {
			var colorPalette = tool.colorPalette[c];

			html += '<li onClick="colors.selectPalette(' + c + ');">';
			html += '<span class="emoji">' + colorPalette.emoji + '</span>';
			html += '<span class="img">' + colors.generateSVGPalette(colorPalette) + '</span>';
			html += '<span class="title">' + colorPalette.title + '</span>';
			html += '</li>';
		}

		html = '<ul>' + html + '</ul>';

		dialog.setContent('palette', html);
		dialog.show('palette');
	},
};

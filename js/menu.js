var menu = {
	init: function() {
		dialog.push(document.querySelector('.dialog .menu'));
	},

	showMainMenu: function() {
		var html = '';
		var cacheSize = filecache.size();

		if (cacheSize > 0) {
			var title = 'Letzte Kunstwerke';
			html += '<li class="group">' + title + '</li>';

			for (var c = 0; c < cacheSize; ++c) {
				var file = filecache.get(c);

				var f = "'cache-" + c + "'";
				html += '<li onClick="menu.selectFile(' + f + ');">';
				html += '<span class="inline-img">' + file.svg + '</span>';
				html += '<span class="title">' + file.title + '</span>';
				html += '</li>';
			}
		}

		for (var f = 0; f < tool.files.length; ++f) {
			var file = tool.files[f];

			if (file.groupId) {
				html += '<li class="group">' + file.title + '</li>';
			} else {
				html += '<li onClick="menu.selectFile(' + f + ');">';
				html += '<span class="img" style="background-image:url(' + file.path + ')"></span>';
				html += '<span class="title">' + file.title + '</span>';
				html += '</li>';
			}
		}

		html = '<ul>' + html + '</ul>';
		html = '<h4>Wähle ein Bild zum ausmalen aus</h4>' + html;

		dialog.setContent('menu', html);
		dialog.show('menu');
	},

	selectFile: function(id) {
		if (typeof id === 'string') {
			var parts = id.split('-');
			if ((parts.length === 2) && (parts[0] === 'cache')) {
				var pos = parseInt(parts[1], 10);
				tool.fileId = null;

				// remove me
				filecache.moveToFront(pos);
				menu.showMainMenu();
				return;
			} else {
				return;
			}
		} else {
			tool.fileId = Math.abs(id);
			if (tool.fileId >= tool.files.length) {
				tool.fileId = 0;
			}
		}

		menu.openImage();
		paint.reload();
		dialog.close();
	},

	openImage: function() {
		tool.canvas.dom.parentElement.classList.remove('hidden');
		tool.tools.classList.remove('hidden');
		tool.subTools.classList.remove('hidden');
	},

	closeImage: function() {
		tool.canvas.dom.parentElement.classList.add('hidden');
		tool.tools.classList.add('hidden');
		tool.subTools.classList.add('hidden');

		filecache.saveCanvas();
		menu.showMainMenu();
	},
};

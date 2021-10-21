var menu = {
	init: function() {
		dialog.push(document.querySelector('.dialog .menu'));
		dialog.push(document.querySelector('.dialog .options'));

		menu.initOptionsMenu();
	},

	initMainMenu: function() {
		function getMenuCachedEntries() {
			var html = '';
			var cacheSize = filecache.size();

			for (var c = 0; c < cacheSize; ++c) {
				var file = filecache.get(c);
				if (file) {
					var f = "'cache-" + c + "'";

					html += '<li class="art" onClick="menu.selectFile(' + f + ');">';
					html += '<span class="inline-img">' + file.svg + '</span>';
					html += '<span class="title">' + file.title + '</span>';
					html += '</li>';
				}
			}

			return html;
		}

		function getMenuChildEntries(group) {
			var html = '';

			for (var f = 0; f < tool.files.length; ++f) {
				var file = tool.files[f];

				if (file.group === group) {
					html += '<li class="art" onClick="menu.selectFile(' + f + ');">';
					html += '<span class="img" style="background-image:url(' + file.path + ')"></span>';
					html += '<span class="title">' + file.title + '</span>';
					html += '</li>';
				}
			}

			return html;
		}

		function getMenuListEntries() {
			var html = '';

			for (var f = 0; f < tool.files.length; ++f) {
				var file = tool.files[f];

				if (file.groupId) {
					html += '<li class="main-group">';
					html += '<div class="main-title">' + file.title + '</div>';

					if (file.groupId === 'savedimages') {
						html += '<ul>' + getMenuCachedEntries() + '</ul>';
					} else {
						html += '<ul>' + getMenuChildEntries(file.groupId) + '</ul>';
					}
					html += '</li>';
				}
			}

			return html;
		}

		var html = getMenuListEntries();

		html = '<ul>' + html + '</ul>';
		html = '<h4>Wähle ein Bild zum ausmalen aus</h4>' + html;

		dialog.setContent('menu', html);
	},

	initOptionsMenu: function() {
		var html = '';

		html += '<button id="undo" class="circle iconUndo"></button>';
		html += '<button id="redo" class="circle iconRedo"></button>';
		html += '<button id="export" class="circle iconShare"></button>';
		html += '<button id="optionsClose" class="circle iconClose"></button>';

		html = '<span class="right">' + html + '</span>';
		html = '<div class="tool">' + html + '</div>';

		dialog.setContent('options', html);
	},

	showMainMenu: function() {
		menu.initMainMenu();
		dialog.show('menu');
	},

	showOptionsMenu: function() {
		dialog.show('options');
	},

	selectFile: function(id) {
		if (typeof id === 'string') {
			var parts = id.split('-');
			if ((parts.length === 2) && (parts[0] === 'cache')) {
				filecache.moveToFront(parseInt(parts[1], 10));
				tool.fileId = null;
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

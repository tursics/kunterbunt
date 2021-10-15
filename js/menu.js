var menu = {
	init: function() {
		dialog.push(document.querySelector('.dialog .menu'));
	},

	showMainMenu: function() {
		var html = '';
		var storedImage = menu.restoreImage();

		if (storedImage) {
			var title = 'Eigene Bilder';
			html += '<li class="group">' + title + '</li>';

			var f = "'storage'";
			html += '<li onClick="menu.selectFile(' + f + ');">';
			html += '<span class="inline-img">' + storedImage.svg + '</span>';
			html += '<span class="title">' + storedImage.title + '</span>';
			html += '</li>';
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
		if (id === 'storage') {
			tool.fileId = null;
			return;
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

		menu.storeImage();
		menu.showMainMenu();
	},

	restoreImage: function() {
		return JSON.parse(localStorage.getItem(tool.storage.keyImage));
	},

	storeImage: function() {
		localStorage.setItem(tool.storage.keyImage, JSON.stringify({
			attribution: tool.canvas.attribtion.innerHTML,
			svg: tool.canvas.svg.outerHTML,
			title: tool.canvas.title,
		}));
	},
};

var dialog = {
	init: function() {
		tool.dialog.background = document.querySelector('.dialog');
		tool.dialog.background.addEventListener('click', dialog.clickBackground);
	},

	push: function(obj) {
		obj.addEventListener('click', dialog.stopPropagation);
		tool.dialog.pages.push(obj);
	},

	setContent: function(name, html) {
		var query = document.querySelector('.dialog .' + name);
		query.innerHTML = html;
	},

	show: function(name) {
		var element = document.querySelector('.dialog .' + name);

		if (element.classList.contains('floating')) {
			tool.dialog.background.classList.add('transparent-background');
		}
		tool.dialog.background.classList.remove('hidden');

		element.classList.add('show');
		element.scrollTo(0, 0);
	},

	close: function() {
		tool.dialog.background.classList.add('hidden');
		tool.dialog.background.classList.remove('transparent-background');

		for (var p = 0; p < tool.dialog.pages.length; ++p) {
			var page = tool.dialog.pages[p];
			if (page.classList.contains('show')) {
				page.classList.remove('show');
			}
		}
	},

	clickBackground: function() {
		for (var p = 0; p < tool.dialog.pages.length; ++p) {
			var page = tool.dialog.pages[p];
			if (page.classList.contains('show') && page.classList.contains('menu')) {
				return;
			}
		}

		dialog.close();
	},

	stopPropagation: function(e) {
		e.stopPropagation();
	},
};

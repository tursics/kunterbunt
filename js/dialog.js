var dialog = {
	init: function() {
		tool.dialog.background = document.querySelector('.dialog');
		tool.dialog.background.addEventListener('click', dialog.close);
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
		tool.dialog.background.classList.remove('hidden');

		document.querySelector('.dialog .' + name).classList.add('show');
	},

	close: function() {
		tool.dialog.background.classList.add('hidden');

		for (var p = 0; p < tool.dialog.pages.length; ++p) {
			var page = tool.dialog.pages[p];
			if (page.classList.contains('show')) {
				page.classList.remove('show');
			}
		}
	},

	stopPropagation: function(e) {
		e.stopPropagation();
	},
};

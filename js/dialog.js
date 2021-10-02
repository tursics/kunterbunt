var dialog = {
	init: function() {
		tool.dialog.background = document.querySelector('.dialog');
		tool.dialog.background.addEventListener('click', dialog.close);
	},

	show: function(name) {
		tool.dialog.background.classList.remove('hidden');
	},

	close: function() {
		tool.dialog.background.classList.add('hidden');
	},
};

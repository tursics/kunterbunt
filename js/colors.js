var colors = {
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
};

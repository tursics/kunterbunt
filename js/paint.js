var paint = {
	init: function() {
		tool.canvas.id = 'graphic';
		tool.canvas.dom = document.getElementById(tool.canvas.id);
		tool.canvas.attribtion = document.getElementById('imageAttribution');
		tool.canvas.title = document.getElementById('imageTitle');

		tool.canvas.dom.addEventListener('load', function() {
			paint.initImage();
		});
	},

	initImage: function() {
		tool.canvas.dom = document.getElementById(tool.canvas.id);
		tool.canvas.doc = tool.canvas.dom.contentDocument;
		tool.canvas.svg = tool.canvas.doc.querySelectorAll('svg')[0];

		var pathes = tool.canvas.doc.querySelectorAll('path');
		for (p = 0; p < pathes.length; ++p) {
			pathes[p].addEventListener('mousedown', paint.onDown);
			pathes[p].addEventListener('mousemove', paint.onMove);
			pathes[p].addEventListener('mouseup', paint.onUp);
		}

		tool.canvas.doc.addEventListener('mousedown', paint.onDown);
		tool.canvas.doc.addEventListener('mousemove', paint.onMove);
		tool.canvas.doc.addEventListener('mouseup', paint.onUp);
	},

	path: function(obj) {
		undo.push(obj);

		var props = 'fill:' + tool.color + ';stroke:none;';
		obj.setAttribute('style', props);
	},

	onDown: function(e) {
		if (e.which !== 1) {
			return;
		}

		tool.canvas.mouseDown = true;
		if ((tool.canvas.mouseMove !== e.target) && (e.target !== tool.canvas.svg)) {
			tool.canvas.mouseMove = e.target;
			paint.path(e.target);
		}
	},

	onMove: function(e) {
		if (tool.canvas.mouseDown && (tool.canvas.mouseMove !== e.target) && (e.target !== tool.canvas.svg)) {
			tool.canvas.mouseMove = e.target;
			paint.path(e.target);
		}
	},

	onUp: function() {
		tool.canvas.mouseDown = false;
		tool.canvas.mouseMove = null;
	},

};

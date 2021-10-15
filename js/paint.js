var paint = {
	init: function() {
		tool.canvas.id = 'graphic';
		tool.canvas.dom = document.getElementById(tool.canvas.id);
		tool.canvas.attribtion = document.getElementById('imageAttribution');

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
			pathes[p].addEventListener('mousedown', paint.onMouseDown, false);
			pathes[p].addEventListener('mousemove', paint.onMouseMove, false);
			pathes[p].addEventListener('mouseup', paint.onUp, false);
		}

		tool.canvas.doc.addEventListener('mousedown', paint.onMouseDown, false);
		tool.canvas.doc.addEventListener('mousemove', paint.onMouseMove, false);
		tool.canvas.doc.addEventListener('mouseup', paint.onUp, false);

		tool.canvas.doc.addEventListener('touchstart', paint.onTouchDown, false);
		tool.canvas.doc.addEventListener('touchmove', paint.onTouchMove, false);
		tool.canvas.doc.addEventListener('touchcancel', paint.onUp, false);
		tool.canvas.doc.addEventListener('touchend', paint.onUp, false);
	},

	reload: function() {
		if (tool.fileId) {
			tool.canvas.dom.setAttribute('data', tool.files[tool.fileId].path);
			tool.canvas.attribtion.innerHTML = tool.files[tool.fileId].license + ': ' + tool.files[tool.fileId].attribution;
			tool.canvas.title = tool.files[tool.fileId].title;
		} else {
			var storedImage = menu.restoreImage();
			tool.canvas.dom.setAttribute('data', '');
			tool.canvas.attribtion.innerHTML = storedImage.attribution;
			tool.canvas.title = storedImage.title;
		}

		undo.reset();
	},

	path: function(obj) {
		undo.push(obj);

		var props = 'fill:' + tool.color + ';stroke:none;';
		obj.setAttribute('style', props);
	},

	onMouseDown: function(e) {
		if (e.which !== 1) {
			return;
		}

		paint.onDown(e.target);
	},

	onTouchDown: function(ev) {
		for (var t = 0; t < ev.touches.length; ++t) {
			paint.onDown(ev.touches[t].target);
		}
	},

	onDown: function(target) {
		tool.canvas.mouseDown = true;
		if ((tool.canvas.mouseMove !== target) && (target !== tool.canvas.svg)) {
			tool.canvas.mouseMove = target;
			paint.path(target);
		}
	},

	pathFromPoint: function(event, id) {
		var clientX = event.touches[id].clientX;
		var clientY = event.touches[id].clientY;
		var x, y;

		if (event.target === tool.canvas.svg) {
			// to do
			return tool.canvas.svg;
			var ctm = tool.canvas.svg.getScreenCTM().inverse();

			var pt = tool.canvas.svg.createSVGPoint();
			pt.x = clientX;
			pt.y = clientY;
			var cursorPt = pt.matrixTransform(ctm);
			x = Math.floor(cursorPt.x);
			y = Math.floor(cursorPt.y);

//			x = clientX;
//			y = clientY;
		} else {
			var ctm = event.target.getScreenCTM();

			x = (clientX - ctm.e) / ctm.a;
			y = (clientY - ctm.f) / ctm.d;
		}

		var paths = tool.canvas.svg.getElementsByTagName('path');
		for (var p = 0; p < paths.length; ++p) {
			var path = paths[p];
			var rect = path.getBBox();
			if ((rect.x <= x) && (x <= (rect.x + rect.width)) && (rect.y <= y) && (y <= (rect.y + rect.height))) {
				return path;
			}
		}

		return tool.canvas.svg;
	},

	onMouseMove: function(e) {
		paint.onMove(e.target);
	},

	onTouchMove: function(ev) {
		for (var t = 0; t < ev.touches.length; ++t) {
			paint.onMove(paint.pathFromPoint(ev, t));
		}
	},

	onMove: function(target) {
		if (tool.canvas.mouseDown && (tool.canvas.mouseMove !== target) && (target !== tool.canvas.svg)) {
			tool.canvas.mouseMove = target;
			paint.path(target);
		}
	},

	onUp: function() {
		tool.canvas.mouseDown = false;
		tool.canvas.mouseMove = null;

		menu.storeImage();
	},

};

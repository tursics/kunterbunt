var filecache = {

	get: function(id) {
		if (id < filecache.size()) {
			return JSON.parse(localStorage.getItem(tool.filecache.keyPrefix + id));
		}
		return null;
	},

	set: function(id, attribution, svg, title) {
		if (id < filecache.size()) {
			var image = filecache.get(id);
			image.attribution = attribution;
			image.svg = svg;
			image.title = title;
			localStorage.setItem(tool.filecache.keyPrefix + id, JSON.stringify(image));
		} else {
			console.error('Wrong file cache index:', id);
		}
	},

	push: function(attribution, svg, title) {
		var size = Math.min(filecache.size() + 1, tool.filecache.max);
		localStorage.setItem(tool.filecache.keySize, size);

		for (var id = size - 1; id > 0; --id) {
			localStorage.setItem(tool.filecache.keyPrefix + id, localStorage.getItem(tool.filecache.keyPrefix + (id - 1)));
		}

		localStorage.setItem(tool.filecache.keyPrefix + 0, JSON.stringify({
			attribution: attribution,
			svg: svg,
			title: title,
		}));
	},

	moveToFront: function(objId) {
		if (objId < filecache.size()) {
			var obj = localStorage.getItem(tool.filecache.keyPrefix + (objId));

			for (var id = objId; id > 0; --id) {
				localStorage.setItem(tool.filecache.keyPrefix + id, localStorage.getItem(tool.filecache.keyPrefix + (id - 1)));
			}

			localStorage.setItem(tool.filecache.keyPrefix + 0, obj);
		} else {
			console.error('Wrong file cache index:', objId);
		}
	},

	size: function() {
		var size = localStorage.getItem(tool.filecache.keySize);
		return size ? size : 0;
	},

	saveCanvas: function() {
		filecache.set(0, tool.canvas.attribtion.innerHTML, tool.canvas.svg.outerHTML, tool.canvas.title);
	},

};

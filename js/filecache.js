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
		var size = 1;
		var id = 0;

		localStorage.setItem(tool.filecache.keySize, size);
		localStorage.setItem(tool.filecache.keyPrefix + id, JSON.stringify({
			attribution: attribution,
			svg: svg,
			title: title,
		}));
	},

	size: function() {
		var size = localStorage.getItem(tool.filecache.keySize);
		return size ? size : 0;
	},

	saveCanvas: function() {
		filecache.set(0, tool.canvas.attribtion.innerHTML, tool.canvas.svg.outerHTML, tool.canvas.title);
	},

};

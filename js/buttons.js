var buttons = {
	init: function() {
		tool.tools = document.querySelector('.tool');
		tool.subTools = document.querySelector('.subtools');

		tool.buttons.close = document.getElementById('close');
		tool.buttons.close.addEventListener('click', menu.closeImage);

		tool.buttons.undo = document.getElementById('undo');
		tool.buttons.undo.addEventListener('click', undo.undo);

		tool.buttons.redo = document.getElementById('redo');
		tool.buttons.redo.addEventListener('click', undo.redo);

		tool.buttons.export = document.getElementById('export');
	  	tool.buttons.export.addEventListener('click', buttons.export);
		if (!navigator.canShare || !navigator.canShare()) {
			tool.buttons.export.classList.remove('iconShare');
			tool.buttons.export.classList.add('iconDownload');
		}

		tool.buttons.palette = document.getElementById('palette');
		tool.buttons.palette.addEventListener('click', colors.openPalette);

		tool.buttons.brush = document.getElementById('brush');
		tool.buttons.brush.addEventListener('click', buttons.nothing);

		tool.buttons.pen = document.getElementById('pen');
		tool.buttons.pen.addEventListener('click', buttons.nothing);

		tool.buttons.colorSwatch = document.getElementsByClassName('swatch');
		for (var s = 0; s < tool.buttons.colorSwatch.length; ++s) {
			tool.buttons.colorSwatch[s].addEventListener('click', colors.setWithThis);
		}
		colors.init();

		tool.buttons.positionNav = document.getElementById('positionNav');
		tool.buttons.positionNav.addEventListener('click', buttons.moveNavigation);
		buttons.moveNavigation();
	},

	update: function() {
		tool.buttons.undo.disabled = tool.history.undo.length === 0;
		tool.buttons.redo.disabled = tool.history.redo.length === 0;
	},

	nothing: function() {
		console.log('-');
	},

	moveNavigation: function() {
		if (tool.navigation === 'left') {
			document.body.classList.remove('toolLeft');
			document.body.classList.add('toolTop');
			tool.navigation = 'top';
		} else if (tool.navigation === 'top') {
			document.body.classList.remove('toolTop');
			document.body.classList.add('toolRight');
			tool.navigation = 'right';
		} else if (tool.navigation === 'right') {
			document.body.classList.remove('toolRight');
			document.body.classList.add('toolBottom');
			tool.navigation = 'bottom';
		} else if (tool.navigation === 'bottom') {
			document.body.classList.remove('toolBottom');
			document.body.classList.add('toolLeft');
			tool.navigation = 'left';
		} else {
			document.body.classList.remove('toolNone');
			document.body.classList.add('toolLeft');
			tool.navigation = 'left';
		}
	},

	toSVGBlob: function(callback) {
		callback(new Blob([tool.canvas.svg.outerHTML], {type: 'image/svg+xml;charset=utf-8'}));
	},

	toCanvas: function(callback) {
		buttons.toSVGBlob(function (blob) {
			var URL = window.URL || window.webkitURL || window;
			var blobURL = URL.createObjectURL(blob);

			var image = new Image();
			image.onload = function() {
				var bbox = tool.canvas.svg.getBBox();
				var canvas = document.createElement('canvas');
				var factorX = tool.export.imageSize / bbox.width;
				var factorY = tool.export.imageSize / bbox.height;
				var factor = factorX;

				if ((bbox.width * factorY) <= tool.export.imageSize) {
					factor = factorY;
				}

				canvas.width = bbox.width * factor;
				canvas.height = bbox.height * factor;

				var context = canvas.getContext('2d');
				context.drawImage(image, 0, 0, canvas.width, canvas.height);

				callback(canvas);
			};

			image.src = blobURL;
		});
	},

	toPNGImage: function(callback) {
		buttons.toCanvas(function (canvas) {
			callback(canvas.toDataURL());
//			callback(canvas.toDataURL('image/jpg'));
//			callback(canvas.toDataURL('image/webp'));
		});
	},

	toPNGBlob: function(callback) {
		buttons.toCanvas(function (canvas) {
			canvas.toBlob(function (blob) {
				callback(blob);
			}, 'image/png');
		});
	},

	download: function(href, name) {
		var link = document.createElement('a');

		link.download = name;
		link.style.opacity = '0';
		document.body.append(link);

		link.href = href;
		link.click();
		link.remove();
	},

	export: function() {
		if (navigator.canShare && navigator.canShare()) {
			buttons.toPNGBlob(function (blob) {
				navigator.share({blob: blob, mimeType: 'image/png'});
			});
		} else {
			buttons.toPNGImage(function (img) {
				buttons.download(img, tool.canvas.title + '.png');
			});
		}
	},

};

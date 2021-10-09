var fileexport = {
	toSVGBlob: function(callback) {
		callback(new Blob([tool.canvas.svg.outerHTML], {type: 'image/svg+xml;charset=utf-8'}));
	},

	toCanvas: function(callback) {
		fileexport.toSVGBlob(function (blob) {
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
		fileexport.toCanvas(function (canvas) {
			callback(canvas.toDataURL());
		});
	},

	toJPGImage: function(callback) {
		fileexport.toCanvas(function (canvas) {
			callback(canvas.toDataURL('image/jpg'));
		});
	},

	toWebPImage: function(callback) {
		fileexport.toCanvas(function (canvas) {
			callback(canvas.toDataURL('image/webp'));
		});
	},

	toPNGBlob: function(callback) {
		fileexport.toCanvas(function (canvas) {
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

	canShare: function() {
		return navigator.canShare && navigator.share;
	},

	export: function() {
		if (fileexport.canShare()) {
			fileexport.toPNGBlob(function (blob) {
				navigator.share({blob: blob, mimeType: 'image/png'});
			});
		} else {
			fileexport.toPNGImage(function (img) {
				fileexport.download(img, tool.canvas.title + '.png');
			});
		}
	},
};

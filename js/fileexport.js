var fileexport = {
	toSVGBlob: function(callback) {
		callback(new Blob([tool.canvas.svg.outerHTML], {type: 'image/svg+xml;charset=utf-8'}));
	},

	toCanvas: function(eraseBackground, callback) {
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
				if (eraseBackground) {
					context.fillStyle = 'white';
					context.fillRect(0, 0, canvas.width, canvas.height);
				}
				context.drawImage(image, 0, 0, canvas.width, canvas.height);

				callback(canvas);
			};

			image.src = blobURL;
		});
	},

	toPNGImage: function(callback) {
		fileexport.toCanvas(false, function (canvas) {
			callback(canvas.toDataURL());
		});
	},

	toJPGImage: function(callback) {
		fileexport.toCanvas(true, function (canvas) {
			callback(canvas.toDataURL('image/jpg'));
		});
	},

	toWebPImage: function(callback) {
		fileexport.toCanvas(true, function (canvas) {
			callback(canvas.toDataURL('image/webp'));
		});
	},

	toPNGBlob: function(callback) {
		fileexport.toCanvas(false, function (canvas) {
			canvas.toBlob(function (blob) {
				callback(blob);
			}, 'image/png');
		});
	},

	toJPGBlob: function(callback) {
		fileexport.toCanvas(true, function (canvas) {
			canvas.toBlob(function (blob) {
				callback(blob);
			}, 'image/jpeg', 0.95);
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
		var filenamePNG = tool.canvas.title + '.png';
		var filenameJPG = tool.canvas.title + '.jpg';

		if (fileexport.canShare()) {
			fileexport.toJPGBlob(function (blob) {
				const fileArray = [new File([blob], filenameJPG, {type: blob.type})];
				const shareData = {
					title: tool.canvas.title,
					text: tool.canvas.title + ', ' + tool.canvas.attribtion.innerHTML,
					files: fileArray,
				};

				navigator.share(shareData);
			});
		} else {
			fileexport.toPNGImage(function (img) {
				fileexport.download(img, filenamePNG);
			});
		}
	},
};

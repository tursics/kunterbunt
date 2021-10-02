function reloadImage() {
	tool.canvas.dom.setAttribute('data', tool.files[tool.fileId].path);
	tool.canvas.title.innerHTML = tool.files[tool.fileId].title;
	tool.canvas.attribtion.innerHTML = tool.files[tool.fileId].license + ': ' + tool.files[tool.fileId].attribution;

	undo.reset();
}

function onButtonResetCanvasColors() {
	var pathes = tool.canvas.doc.querySelectorAll('path');

	for (p = 0; p < pathes.length; ++p) {
		var props = 'fill:#fff;stroke:#aaa;stroke-width:0.1;';
		pathes[p].setAttribute('style', props);
	}

	undo.reset();
}

function onButtonNextImage() {
	++tool.fileId;
	if (tool.fileId >= tool.files.length) {
		tool.fileId = 0;
	}

	reloadImage();
}

function initButtons() {
	buttons.init();

	tool.buttons.resetCanvasColors = document.getElementById('resetColor');
	tool.buttons.resetCanvasColors.addEventListener('click', onButtonResetCanvasColors);

	tool.buttons.nextImage = document.getElementById('nextImage');
	tool.buttons.nextImage.addEventListener('click', onButtonNextImage);

	buttons.update();
}

function initDialog() {
	tool.dialog.background = document.querySelector('.dialog');
	tool.dialog.background.addEventListener('click', closeDialog);
}

function showDialog(name) {
	tool.dialog.background.classList.remove('hidden');
}

function closeDialog() {
	tool.dialog.background.classList.add('hidden');
}

window.addEventListener('load', function() {
	tool.files = mediaConfig;

	paint.init();

	initButtons();
	reloadImage();

	initDialog();
});

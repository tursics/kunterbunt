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

function onButtonPositionNav() {
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
}

function initButtons() {
	buttons.init();

	tool.buttons.resetCanvasColors = document.getElementById('resetColor');
	tool.buttons.resetCanvasColors.addEventListener('click', onButtonResetCanvasColors);

	tool.buttons.nextImage = document.getElementById('nextImage');
	tool.buttons.nextImage.addEventListener('click', onButtonNextImage);

	tool.buttons.positionNav = document.getElementById('positionNav');
	tool.buttons.positionNav.addEventListener('click', onButtonPositionNav);

	onButtonPositionNav();
	buttons.update();
}

window.addEventListener('load', function() {
	tool.files = mediaConfig;

	paint.init();

	initButtons();
	reloadImage();
});

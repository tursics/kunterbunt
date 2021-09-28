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

function selectCanvasPath() {
	undo.push(this);

	var props = 'fill:' + tool.color + ';stroke:none;';
	this.setAttribute('style', props);
}

function onButtonColorSwatch() {
	var actives = document.getElementsByClassName('active');
	if (actives.length > 0) {
		actives[0].classList.remove('active');
	}
	this.classList.add('active');
	tool.color = window.getComputedStyle(this).getPropertyValue('background-color');
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

function onMouseDown(e) {
	if (e.which !== 1) {
		return;
	}

	tool.canvas.mouseDown = true;
	if ((tool.canvas.mouseMove !== e.target) && (e.target !== tool.canvas.svg)) {
		tool.canvas.mouseMove = e.target;
		selectCanvasPath.call(e.target);
	}
}

function onMouseMove(e) {
	if (tool.canvas.mouseDown && (tool.canvas.mouseMove !== e.target) && (e.target !== tool.canvas.svg)) {
		tool.canvas.mouseMove = e.target;
		selectCanvasPath.call(e.target);
	}
}

function onMouseUp() {
	tool.canvas.mouseDown = false;
	tool.canvas.mouseMove = null;
}

function initCanvas() {
	tool.canvas.dom = document.getElementById(tool.canvas.id);
	tool.canvas.doc = tool.canvas.dom.contentDocument;
	tool.canvas.svg = tool.canvas.doc.querySelectorAll('svg')[0];

	var pathes = tool.canvas.doc.querySelectorAll('path');
    for (p = 0; p < pathes.length; ++p) {
        pathes[p].addEventListener('mousedown', onMouseDown);
        pathes[p].addEventListener('mousemove', onMouseMove);
        pathes[p].addEventListener('mouseup', onMouseUp);
    }

	tool.canvas.doc.addEventListener('mousedown', onMouseDown);
	tool.canvas.doc.addEventListener('mousemove', onMouseMove);
	tool.canvas.doc.addEventListener('mouseup', onMouseUp);
}

function initButtons() {
	buttons.init();

	tool.buttons.resetCanvasColors = document.getElementById('resetColor');
	tool.buttons.resetCanvasColors.addEventListener('click', onButtonResetCanvasColors);

	tool.buttons.nextImage = document.getElementById('nextImage');
	tool.buttons.nextImage.addEventListener('click', onButtonNextImage);

	tool.buttons.positionNav = document.getElementById('positionNav');
	tool.buttons.positionNav.addEventListener('click', onButtonPositionNav);

	var swatches = document.getElementsByClassName('swatch');
    for (var s = 0; s < swatches.length; ++s) {
        swatches[s].addEventListener('click', onButtonColorSwatch);
	}

	onButtonPositionNav();
	onButtonColorSwatch.call(document.querySelector('.swatch.red'));
	buttons.update();
}

window.addEventListener('load', function() {
	tool.canvas.id = 'graphic';
	tool.canvas.dom = document.getElementById(tool.canvas.id);
	tool.canvas.attribtion = document.getElementById('imageAttribution');
	tool.canvas.title = document.getElementById('imageTitle');
	tool.files = mediaConfig;

	tool.canvas.dom.addEventListener('load', function() {
		initCanvas();
	});

	initButtons();
	reloadImage();
});

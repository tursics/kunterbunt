var tool = {
	buttons: {
		nextImage: null,
		redo: null,
		resetCanvasColors: null,
		undo: null,
	},
	canvas: {
		dom: null,
		doc: null,
		id: '',
		mouseDown: false,
		mouseMove: null,
		svg: null,
	},
	color: '#fff',
	fileId: 0,
	files: [
		'media/duck.svg',
//		'media/duck-outline.svg',
		'media/duck-frame.svg',
	],
	history: {
		redo: [],
		undo: [],
	},
};

function reloadImage() {
	tool.canvas.dom.setAttribute('data', tool.files[tool.fileId]);

	tool.history.undo = [];
	tool.history.redo = [];
	enableDisableButtons();
}

function onButtonResetCanvasColors() {
	var pathes = tool.canvas.doc.querySelectorAll('path');

	for (p = 0; p < pathes.length; ++p) {
		var props = 'fill:#fff;stroke:#aaa;stroke-width:0.1;';
		pathes[p].setAttribute('style', props);
	}

	tool.history.undo = [];
	tool.history.redo = [];
	enableDisableButtons();
}

function onButtonNextImage() {
	++tool.fileId;
	if (tool.fileId >= tool.files.length) {
		tool.fileId = 0;
	}

	reloadImage();
}

function onButtonUndo() {
	var action = tool.history.undo.pop();
	tool.history.redo.push({
		path: action.path,
		props: action.path.getAttribute('style'),
	});
	enableDisableButtons();

	action.path.setAttribute('style', action.props);
}

function onButtonRedo() {
	var action = tool.history.redo.pop();
	tool.history.undo.push({
		path: action.path,
		props: action.path.getAttribute('style'),
	});
	enableDisableButtons();

	action.path.setAttribute('style', action.props);
}

function selectCanvasPath() {
	tool.history.undo.push({
		path: this,
		props: this.getAttribute('style'),
	});
	tool.history.redo = [];
	enableDisableButtons();

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

function onMouseDown(e) {
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

function enableDisableButtons() {
	tool.buttons.undo.disabled = tool.history.undo.length === 0;
	tool.buttons.redo.disabled = tool.history.redo.length === 0;
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
	tool.buttons.resetCanvasColors = document.getElementById('resetColor');
	tool.buttons.resetCanvasColors.addEventListener('click', onButtonResetCanvasColors);

	tool.buttons.nextImage = document.getElementById('nextImage');
	tool.buttons.nextImage.addEventListener('click', onButtonNextImage);

	tool.buttons.undo = document.getElementById('undo');
	tool.buttons.undo.addEventListener('click', onButtonUndo);

	tool.buttons.redo = document.getElementById('redo');
	tool.buttons.redo.addEventListener('click', onButtonRedo);

	var swatches = document.getElementsByClassName('swatch');
    for (var s = 0; s < swatches.length; ++s) {
        swatches[s].addEventListener('click', onButtonColorSwatch);
	}

	onButtonColorSwatch.call(document.querySelector('.swatch.red'));
	enableDisableButtons();
}

window.addEventListener('load', function() {
	tool.canvas.id = 'graphic';
	tool.canvas.dom = document.getElementById(tool.canvas.id);

	tool.canvas.dom.addEventListener('load', function() {
		initCanvas();
	});

	initButtons();
	reloadImage();
});

var tool = {
	buttons: {
		nextImage: null,
		positionNav: null,
		redo: null,
		resetCanvasColors: null,
		undo: null,
	},
	canvas: {
		attribtion: null,
		dom: null,
		doc: null,
		id: '',
		mouseDown: false,
		mouseMove: null,
		svg: null,
		title: null,
	},
	color: '#fff',
	fileId: 0,
	files: [
		{
			attribution: 'Rheinisches Bildarchiv Köln / Römisch Germanisches Museum Köln / Anja Wegner',
			dating: 'ca. 220-355',
			license: 'CC BY-SA 3.0 DE',
			material: 'Natursteine, Glas, Keramik',
			path: 'media/duck.svg',
			sourceFile: 'rba_d022237.jpg',
			title: 'Dionysos-Mosaik, Stockente',
		},
		{
			attribution: 'Rheinisches Bildarchiv Köln / Römisch Germanisches Museum Köln / Anja Wegner',
			dating: 'ca. 220-355',
			license: 'CC BY-SA 3.0 DE',
			material: 'Natursteine, Glas, Keramik',
			path: 'media/duck-frame.svg',
			sourceFile: 'rba_d022237.jpg',
			title: 'Dionysos-Mosaik, Detailaufnahme, Stockente',
		},
	],
	history: {
		redo: [],
		undo: [],
	},
	navigation: '',
};

function reloadImage() {
	tool.canvas.dom.setAttribute('data', tool.files[tool.fileId].path);
	tool.canvas.title.innerHTML = tool.files[tool.fileId].title;
	tool.canvas.attribtion.innerHTML = tool.files[tool.fileId].license + ': ' + tool.files[tool.fileId].attribution;

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

function onButtonPositionNav() {
	if (tool.navigation === 'left') {
		document.body.classList.remove('toolLeft');
		document.body.classList.add('toolTop');
		tool.navigation = 'top';
		tool.buttons.positionNav.innerHTML = 'Nach rechts';
	} else if (tool.navigation === 'top') {
		document.body.classList.remove('toolTop');
		document.body.classList.add('toolRight');
		tool.navigation = 'right';
		tool.buttons.positionNav.innerHTML = 'Nach unten';
	} else if (tool.navigation === 'right') {
		document.body.classList.remove('toolRight');
		document.body.classList.add('toolBottom');
		tool.navigation = 'bottom';
		tool.buttons.positionNav.innerHTML = 'Nach links';
	} else if (tool.navigation === 'bottom') {
		document.body.classList.remove('toolBottom');
		document.body.classList.add('toolLeft');
		tool.navigation = 'left';
		tool.buttons.positionNav.innerHTML = 'Nach oben';
	} else {
		document.body.classList.remove('toolNone');
		document.body.classList.add('toolLeft');
		tool.navigation = 'left';
		tool.buttons.positionNav.innerHTML = 'Nach oben';
	}
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

	tool.buttons.positionNav = document.getElementById('positionNav');
	tool.buttons.positionNav.addEventListener('click', onButtonPositionNav);

	var swatches = document.getElementsByClassName('swatch');
    for (var s = 0; s < swatches.length; ++s) {
        swatches[s].addEventListener('click', onButtonColorSwatch);
	}

	onButtonPositionNav();
	onButtonColorSwatch.call(document.querySelector('.swatch.red'));
	enableDisableButtons();
}

window.addEventListener('load', function() {
	tool.canvas.id = 'graphic';
	tool.canvas.dom = document.getElementById(tool.canvas.id);
	tool.canvas.attribtion = document.getElementById('imageAttribution');
	tool.canvas.title = document.getElementById('imageTitle');

	tool.canvas.dom.addEventListener('load', function() {
		initCanvas();
	});

	initButtons();
	reloadImage();
});

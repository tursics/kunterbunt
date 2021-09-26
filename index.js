var tool = {
	buttons: {
		resetCanvasColors: null,
		nextImage: null,
	},
	canvas: {
		dom: null,
		doc: null,
		id: '',
		mouseDown: false,
	},
	color: '#fff',
	fileId: 0,
	files: [
		'media/duck.svg',
		'media/duck-outline.svg',
		'media/duck-frame.svg',
	],
};

function onButtonResetCanvasColors() {
	var pathes = tool.canvas.doc.querySelectorAll('path');

	for (p = 0; p < pathes.length; ++p) {
		var props = 'fill:#fff;stroke:#aaa;stroke-width:0.1;';
		pathes[p].setAttribute('style', props);
	}
}

function reloadImage() {
	tool.canvas.dom.setAttribute('data', tool.files[tool.fileId]);
}

function onButtonNextImage() {
	++tool.fileId;
	if (tool.fileId >= tool.files.length) {
		tool.fileId = 0;
	}

	reloadImage();
}

function selectCanvasPath() {
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
	selectCanvasPath.call(e.target);
}

function onMouseMove(e) {
	if (tool.canvas.mouseDown) {
		selectCanvasPath.call(e.target);
	}
}

function onMouseUp() {
	tool.canvas.mouseDown = false;
}

function initCanvas() {
	tool.canvas.dom = document.getElementById(tool.canvas.id);
	tool.canvas.doc = tool.canvas.dom.contentDocument;

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

    var swatches = document.getElementsByClassName('swatch');
    for (var s = 0; s < swatches.length; ++s) {
        swatches[s].addEventListener('click', onButtonColorSwatch);
	}

	onButtonColorSwatch.call(document.querySelector('.swatch.red'));
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

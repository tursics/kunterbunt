var tool = {
	buttons: {
		resetCanvasColors: null,
	},
	canvas: {
		dom: null,
		doc: null,
		id: '',
	},
	color: '#fff',
};

function onButtonResetCanvasColors() {
	var pathes = tool.canvas.doc.querySelectorAll('path');

	for (p = 0; p < pathes.length; ++p) {
		var props = 'fill:#fff;stroke:#aaa;stroke-width:0.1;';
		pathes[p].setAttribute('style', props);
	}
}

function onCanvasPath() {
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

function initCanvas(idCanvas) {
	tool.canvas.id = idCanvas;
	tool.canvas.dom = document.getElementById(tool.canvas.id);
	tool.canvas.doc = tool.canvas.dom.contentDocument;

    var pathes = tool.canvas.doc.querySelectorAll('path');
    for (p = 0; p < pathes.length; ++p) {
        pathes[p].addEventListener('click', onCanvasPath);
    }
}

function initButtons() {
	tool.buttons.resetCanvasColors = document.getElementById('resetColor');
	tool.buttons.resetCanvasColors.addEventListener('click', onButtonResetCanvasColors);

    var swatches = document.getElementsByClassName('swatch');
    for (var s = 0; s < swatches.length; ++s) {
        swatches[s].addEventListener('click', onButtonColorSwatch);
	}

	onButtonColorSwatch.call(document.querySelector('.swatch.red'));
}

window.addEventListener('load', function() {
	initButtons();
	initCanvas('graphic');
});

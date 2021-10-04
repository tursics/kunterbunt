function onButtonResetCanvasColors() {
	var pathes = tool.canvas.doc.querySelectorAll('path');

	for (p = 0; p < pathes.length; ++p) {
		var props = 'fill:#fff;stroke:#aaa;stroke-width:0.1;';
		pathes[p].setAttribute('style', props);
	}

	undo.reset();
}

function initButtons() {
	buttons.init();

	tool.buttons.resetCanvasColors = document.getElementById('resetColor');
	tool.buttons.resetCanvasColors.addEventListener('click', onButtonResetCanvasColors);

	buttons.update();
}

window.addEventListener('load', function() {
	tool.colorPalette = mediaColorSwatch;
	tool.files = mediaConfig;

	paint.init();

	initButtons();

	dialog.init();

	menu.init();
	menu.showMainMenu();
});

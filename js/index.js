function preventScrolling() {
	document.body.addEventListener('touchmove', function(event) {
		event.preventDefault();
	}, false); 
}

window.addEventListener('load', function() {
	tool.colorPalette = mediaColorSwatch;
	tool.files = mediaConfig;

	preventScrolling();

	paint.init();
	dialog.init();
	menu.init();
	buttons.init();
	buttons.update();

	menu.showMainMenu();
});

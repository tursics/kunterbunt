window.addEventListener('load', function() {
	tool.colorPalette = mediaColorSwatch;
	tool.files = mediaConfig;

	paint.init();

	buttons.init();
	buttons.update();

	dialog.init();

	menu.init();
	menu.showMainMenu();
});

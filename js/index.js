function preventScrolling() {
	document.body.addEventListener('touchmove', function(event) {
		event.preventDefault();
	}, false); 
}

function fixViewPortHeight() {
	function fix() {
		var vh = window.innerHeight;
		document.documentElement.style.setProperty('--vh', vh + 'px');
	}

	window.addEventListener('resize', fix);
	fix();
}

window.addEventListener('load', function() {
	tool.colorPalette = mediaColorSwatch;
	tool.files = mediaConfig;

	preventScrolling();
	fixViewPortHeight();

	paint.init();
	dialog.init();
	menu.init();
	buttons.init();
	buttons.update();

	menu.showMainMenu();
});

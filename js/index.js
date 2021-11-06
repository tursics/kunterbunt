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

function preventIOS10AccessibilityFeature() {
	document.addEventListener('gesturestart', function (e) {
		e.preventDefault();
	});
}

window.addEventListener('load', function() {
	tool.colorPalette = mediaColorSwatch;
	tool.files = mediaConfig;

	preventScrolling();
	preventIOS10AccessibilityFeature();
	fixViewPortHeight();

	paint.init();
	dialog.init();
	menu.init();
	buttons.init();
	buttons.update();

	menu.showMainMenu();
});

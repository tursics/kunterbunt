var tool = {
	buttons: {
		brush: null,
		colorSwatch: [],
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
	files: [],
	history: {
		redo: [],
		undo: [],
	},
	navigation: '',
	subTools: null,
};

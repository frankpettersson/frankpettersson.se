var paper = document.getElementById('paper');

var count = 150;
var path = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: 'white',
	strokeColor: 'black'
});

var symbol = new Symbol(path);
for (var i = 0; i < count; i++) {
	var center = Point.random() * view.size;
	var placedSymbol = symbol.place(center);
	placedSymbol.scale(i / count);
}

function onFrame(event) {
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		item.position.x += item.bounds.width / 20;
		if (item.bounds.left > view.size.width) {
			item.position.x = -item.bounds.width;
		}
	}
}
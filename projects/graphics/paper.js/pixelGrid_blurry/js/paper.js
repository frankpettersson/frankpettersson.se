var paper = document.getElementById('paper');
var container = document.getElementById('container');
var setCanvasWidth = 400;
var setCanvasHeight = 400;
container.style.width = setCanvasWidth+'px';
container.style.height = setCanvasHeight+'px';
var paperWidth = container.offsetWidth - 2;
var paperHeight = container.offsetHeight - 2;
var xPixels = paperWidth / 10;
var yPixels = paperHeight / 10;

var xArray = [];
var yArray = [];
for (var i = 0; i < xPixels; i++) {
	for (var j = 0; j < yPixels; j++) {
		var pixel = new Path.Rectangle({
			point: [i, j],
			size: [1, 1],
			fillColor: 'lightblue'
		});
		yArray.push(pixel);
	}
	xArray.push(yArray);
	yArray = [];
}

function onFrame(event) {
	for (var i = 0; i < xPixels; i++) {
		for (var j = 0; j < yPixels; j++) {
			xArray[i][j].fillColor.hue += Math.floor((Math.random() * 10) + 1);
		}
	}
}
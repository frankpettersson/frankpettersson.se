var factor = 10;
const container = {
    id: document.getElementById('container'),
    width: document.body.clientWidth,
    height: document.body.clientHeight
};
const paper = {
    id: document.getElementById('paper'),
    width: document.body.clientWidth,
    height: document.body.clientHeight
};
var xPixels = container.style.width / factor;
var yPixels = container.style.height / factor;
var xArray = [];
var yArray = [];

var xPos = 0;
for (var i = 0; i < xPixels; i++) {
	var yPos = 0;
	for (var j = 0; j < yPixels; j++) {
		var pixel = new Path.Rectangle({
			point: [xPos, yPos],
			size: [factor, factor],
			fillColor: 'lightblue'
		});
		yArray.push(pixel);
		yPos += factor;
	}
	xArray.push(yArray);
	xPos += factor;
	yArray = [];
	yPos = 0;
}

function onFrame(event) {
	for (var i = 0; i < xPixels; i++) {
		for (var j = 0; j < yPixels; j++) {
			var random =  Math.floor((Math.random() * 10) + 1);
			xArray[i][j].fillColor.hue += random;
		}
	}
}
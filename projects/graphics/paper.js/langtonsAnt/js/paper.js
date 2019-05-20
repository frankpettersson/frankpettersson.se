//CREATE GRID
var factor = 10;
var xPixels = canvasWidth / factor;
var yPixels = canvasHeight / factor;
var xArray = [];
var yArray = [];
var xPos = 0;
for (var i = 0; i < xPixels; i++) {
	var yPos = 0;
	for (var j = 0; j < yPixels; j++) {
		var pixel = new Path.Rectangle({
			point: [xPos, yPos],
			size: [factor, factor],
			fillColor: 'white'
		});
		yArray.push(pixel);
		yPos += factor;
	}
	xArray.push(yArray);
	xPos += factor;
	yArray = [];
	yPos = 0;
}

//ANT
var ant = new Path.Rectangle({
	point: [(canvasWidth / 2), (canvasHeight / 2)],
	size: [factor, factor],
	fillColor: 'red'
});

//MOVEMENT
var direction = 0;  //up = 0, right = 1, down = 2, left = 3

function turnLeft(dir) {
	if (dir <= 0) {
		direction = 3;
	} else {
		direction -= 1;
	}
}

function turnRight(dir) {
	if (dir >= 3) {
		direction = 0;
	} else {
		direction += 1;
	}
}

function moveForward(dir) {
	if (dir === 0) {
		ant.position.y -= factor;
	} else if (dir === 1) {
		ant.position.x += factor;
	} else if (dir === 2) {
		ant.position.y += factor;
	} else if (dir === 3) {
		ant.position.x -= factor;
	}
}

//COLORS
var	r1 = 255, g1 = 255, b1 = 255,
	color1 = 'rgb('+r1+', '+g1+', '+b1+')',
	c1R = r1 / 255,
	c1G = g1 / 255,
	c1B = b1 / 255;

var	r2 = 0, g2 = 0, b2 = 0,
	color2 = 'rgb('+r2+', '+g2+', '+b2+')',
	c2R = r2 / 255,
	c2G = g2 / 255,
	c2B = b2 / 255;

//UPDATER
function onFrame(event) {
	for (var i = 0; i < xPixels; i++) {
		for (var j = 0; j < yPixels; j++) {
			if (ant.position.x === xArray[i][j].position.x && ant.position.y === xArray[i][j].position.y) {
				if (xArray[i][j].fillColor.red === c1R && xArray[i][j].fillColor.green === c1G && xArray[i][j].fillColor.blue === c1B) {
					xArray[i][j].fillColor = 'black';
					turnRight(direction);
					moveForward(direction);
				} else if (xArray[i][j].fillColor.red === c2R && xArray[i][j].fillColor.green === c2G && xArray[i][j].fillColor.blue === c2B) {
					xArray[i][j].fillColor = 'white';
					turnLeft(direction);
					moveForward(direction);
				}
			} else if (ant.position.x > canvasWidth) {
				ant.position.x = factor / 2;
			} else if (ant.position.x < 0) {
				ant.position.x = canvasWidth - (factor / 2);
			} else if (ant.position.y > canvasHeight) {
				ant.position.y = factor / 2;
			} else if (ant.position.y < 0) {
				ant.position.y = canvasHeight - (factor / 2);
			}	
		}
	}
}
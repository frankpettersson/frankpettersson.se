//FUNCTIONS
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

//CREATE GRID
var factor = 5;
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
			size: [factor, factor]
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

//COLORS
var	r1 = 0, g1 = 0, b1 = 0,
	color1 = 'rgb('+r1+', '+g1+', '+b1+')',
	c1R = r1 / 255,
	c1G = g1 / 255,
	c1B = b1 / 255;

var	r2 = 48, g2 = 193, b2 = 23,
	color2 = 'rgb('+r2+', '+g2+', '+b2+')',
	c2R = r2 / 255,
	c2G = g2 / 255,
	c2B = b2 / 255;
	
var	r3 = 242, g3 = 217, b3 = 29,
	color3 = 'rgb('+r3+', '+g3+', '+b3+')',
	c3R = r3 / 255,
	c3G = g3 / 255,
	c3B = b3 / 255;

//UPDATER
function onFrame(event) {
	for (var i = 0; i < xPixels; i++) {
		for (var j = 0; j < yPixels; j++) {
			if (ant.position.x === xArray[i][j].position.x && ant.position.y === xArray[i][j].position.y) {
				if (xArray[i][j].fillColor === null) {
					if (direction === 0) {
						ant.position.y -= factor;
						xArray[i][j].fillColor = color1;
						turnRight(direction);
						//sleep(100);
					} else if (direction === 1) {
						ant.position.x += factor;
						xArray[i][j].fillColor = color1;
						turnRight(direction);
						//sleep(100);
					} else if (direction === 2) {
						ant.position.y += factor;
						xArray[i][j].fillColor = color1;
						turnRight(direction);
						//sleep(100);
					} else if (direction === 3) {
						ant.position.x -= factor;
						xArray[i][j].fillColor = color1;
						turnRight(direction);
						//sleep(100);
					}
				} else if (xArray[i][j].fillColor.red === c1R && xArray[i][j].fillColor.green === c1G && xArray[i][j].fillColor.blue === c1B) {
					if (direction === 0) {
						ant.position.y -= factor;
						xArray[i][j].fillColor = color2;
						turnLeft(direction);
						//sleep(100);
					} else if (direction === 1) {
						ant.position.x += factor;
						xArray[i][j].fillColor = color2;
						turnLeft(direction);
						//sleep(100);
					} else if (direction === 2) {
						ant.position.y += factor;
						xArray[i][j].fillColor = color2;
						turnLeft(direction);
						//sleep(100);
					} else if (direction === 3) {
						ant.position.x -= factor;
						xArray[i][j].fillColor = color2;
						turnLeft(direction);
						//sleep(100);
					}
				} else if (xArray[i][j].fillColor.red === c2R && xArray[i][j].fillColor.green === c2G && xArray[i][j].fillColor.blue === c2B) {
					if (direction === 0) {
						ant.position.y -= factor;
						xArray[i][j].fillColor = color3;
						turnRight(direction);
						//sleep(100);
					} else if (direction === 1) {
						ant.position.x += factor;
						xArray[i][j].fillColor = color3;
						turnLeft(direction);
						//sleep(100);
					} else if (direction === 2) {
						ant.position.y += factor;
						xArray[i][j].fillColor = color3;
						//sleep(100);
					} else if (direction === 3) {
						ant.position.x -= factor;
						xArray[i][j].fillColor = color3;
						turnRight(direction);
						//sleep(100);
					}
				} else if (xArray[i][j].fillColor.red === c3R && xArray[i][j].fillColor.green === c3G && xArray[i][j].fillColor.blue === c3B){
					direction = Math.floor((Math.random() * 3) + 0);
					console.log(direction);
					if (direction === 0) {
						ant.position.y -= factor;
					} else if (direction === 1) {
						ant.position.x += factor;
					} else if (direction === 2) {
						ant.position.y += factor;
					} else if (direction === 3) {
						ant.position.x -= factor;
					}
				}
			}
		}
	}
}
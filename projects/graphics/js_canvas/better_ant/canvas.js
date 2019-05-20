const cellSize = 10;
const antColour = 'yellow';
const groundColour = 'orange';
const wallColour = 'red';

const canvas = document.getElementById('canvas').getContext('2d');
const width = document.body.clientWidth;
const height =  document.body.clientHeight;
document.getElementById('canvas').width = width;
document.getElementById('canvas').height = height;

let grid = [],
	columns = Math.floor(width/cellSize),
	rows = Math.floor(height/cellSize),
	ants = [],
	toDraw = [];

for (let i = 0; i < rows; i++){
	grid[i] = [];
	for (let j = 0; j < columns; j++){
		grid[i][j] = 0;
	}
}

function ant(x, y, d){
	return {x, y, d}
}

function draw() {
	for (let i in toDraw){
		let colour = false;
		if (toDraw[i][2] === 0) {
			colour = groundColour;
		} else if (toDraw[i][2] === 1) {
			colour = wallColour;
		} else if (toDraw[i][2] === 2) {
			colour = antColour;
		}
		canvas.fillStyle = colour;
		canvas.fillRect((toDraw[i][0]*cellSize), (toDraw[i][1]*cellSize), cellSize, cellSize);
	}
	toDraw = [];
}

function wall(x,y,c){
	grid[y][x] = c;
	toDraw.push([x, y, c]);
}

function update(grid, ant){
	if (grid[ant.y][ant.x] === 0){
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);
		wall(ant.x, ant.y, 1);
	} else {
		ant.d = (ant.d === 0) ? 3 : (ant.d-1);
		wall(ant.x, ant.y, 0);
	}
	//Ant grid movement
	if (ant.d === 0)
		ant.y--;
	if (ant.d === 1)
		ant.x++;
	if (ant.d === 2)
		ant.y++;
	if (ant.d === 3)
		ant.x--;
	//Border loop
	if (ant.x >= columns)
		ant.x = 0;
	if (ant.x < 0)
		ant.x = (columns-1)
	if (ant.y >= rows)
		ant.y = 0;
	if (ant.y < 0)
		ant.y = (rows-1);
	toDraw.push([ant.x, ant.y, 2]);
}

ants.push(ant(Math.round((columns/2)/10)*10, Math.round((rows/2)/10)*10, 0));
function loop() {
	requestAnimationFrame(loop);
	let grids = grid.slice();
	for (let i in ants){
		update(grids, ants[i]);
	}
	draw();
}
loop();
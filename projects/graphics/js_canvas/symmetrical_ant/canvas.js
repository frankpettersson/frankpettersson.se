const cellSize = 10;
const canvas = document.querySelector('canvas').getContext('2d');
const width = document.body.clientWidth;
const height =  document.body.clientHeight;
document.querySelector('canvas').width = width;
document.querySelector('canvas').height = height;

let colors = [
	'#A682FF',
	'#715AFF',
	'#5887FF',
	'#55C1FF',
	'#C3E0F4',
	'#003459',
	'#007EA7',
	'#00A8E8',
	'#136F63',
	'#22AAA1',
	'#4CE0D2',
	'#84CAE7',
]

let grid = [],
	columns = Math.floor(width/cellSize),
	rows = Math.floor(height/cellSize),
	ants = [],
	toDraw = [];

for (let i = 0; i < rows; i++){
	grid[i] = [];
	for (let j = 0; j < columns; j++){
		grid[i][j] = 1;
	}
}

function ant(x, y, d){
	return {x, y, d}
}

function draw() {
	for (let i in toDraw){
		let colour = false;
		
		if (toDraw[i][2] === 1) colour = colors[0];
		else if (toDraw[i][2] === 2) colour = colors[1];
		else if (toDraw[i][2] === 3) colour = colors[2];
		else if (toDraw[i][2] === 4) colour = colors[3];
		
		if (toDraw[i][2] === 0) {
			colour = 'red';
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

	//LLRR
	//1234
	if (grid[ant.y][ant.x] === 1) {
		ant.d = (ant.d === 0) ? 3 : (ant.d-1);//1L
		wall(ant.x, ant.y, 2);
	} else if (grid[ant.y][ant.x] === 2) {
		ant.d = (ant.d === 0) ? 3 : (ant.d-1);//2L
		wall(ant.x, ant.y, 3);
	} else if (grid[ant.y][ant.x] === 3) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//3R
		wall(ant.x, ant.y, 4);
	} else if (grid[ant.y][ant.x] === 4) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//4R
		wall(ant.x, ant.y, 1);
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

	toDraw.push([ant.x, ant.y, 0]);
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
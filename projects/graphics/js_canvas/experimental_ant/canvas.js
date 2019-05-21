const cellSize = 5;
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
		else if (toDraw[i][2] === 5) colour = colors[4];
		else if (toDraw[i][2] === 6) colour = colors[5];
		else if (toDraw[i][2] === 7) colour = colors[6];
		else if (toDraw[i][2] === 8) colour = colors[7];
		else if (toDraw[i][2] === 9) colour = colors[8];
		else if (toDraw[i][2] === 10) colour = colors[9];
		else if (toDraw[i][2] === 11) colour = colors[10];
		else if (toDraw[i][2] === 12) colour = colors[11];
		
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

	//RRLLL RLLL RRR
	//123456789123
	if (grid[ant.y][ant.x] === 1) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//1R
		wall(ant.x, ant.y, 2);
	} else if (grid[ant.y][ant.x] === 2) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//2R
		wall(ant.x, ant.y, 3);
	} else if (grid[ant.y][ant.x] === 3) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//3L
		wall(ant.x, ant.y, 4);
	} else if (grid[ant.y][ant.x] === 4) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//4L
		wall(ant.x, ant.y, 5);
	} else if (grid[ant.y][ant.x] === 5) {
		ant.d = (ant.d === 0) ? 3 : (ant.d-1);//5L
		wall(ant.x, ant.y, 6);
	} else if (grid[ant.y][ant.x] === 6) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//6R
		wall(ant.x, ant.y, 7);
	} else if (grid[ant.y][ant.x] === 7) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//7L
		wall(ant.x, ant.y, 8);
	} else if (grid[ant.y][ant.x] === 8) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//8L
		wall(ant.x, ant.y, 9);
	} else if (grid[ant.y][ant.x] === 9) {
		ant.d = (ant.d === 0) ? 3 : (ant.d-1);//9L
		wall(ant.x, ant.y, 10);
	} else if (grid[ant.y][ant.x] === 10) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//10R
		wall(ant.x, ant.y, 11);
	} else if (grid[ant.y][ant.x] === 11) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//11R
		wall(ant.x, ant.y, 12);
	} else if (grid[ant.y][ant.x] === 12) {
		ant.d = (ant.d === 3) ? 0 : (ant.d+1);//12R
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
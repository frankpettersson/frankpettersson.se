let canvas = {
    id: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
    width: Math.round(document.body.clientWidth),
    height: Math.round(document.body.clientHeight),
    init: function() {
        this.id.width = canvas.width;
        this.id.height = canvas.height;
        this.shapes();
        this.animate();
    },
    dir: [],
    lastDir: [],
    boxes: [],
    size: Math.min(
        Math.round(document.body.clientWidth/50), 
        Math.round(document.body.clientHeight/50)
    ),
    shapes: function() {
        for (let i = 0; i < 20; i++) {
            this.boxes[i] = [];
            this.dir[i] = [];
            this.lastDir[i] = [];
            for (let j = 0; j < 20; j++) {
                let color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                let box = new Box(this.size*j, this.size*j+(i*this.size)+(this.size*2), this.size, this.size, color, true);
                this.boxes[i].push(box);
                this.dir[i][j] = 'downright';
                this.lastDir[i][j] = 'upright';
            }
        }
    },
    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.width, this.height);
        let speed = 1;
        for (let i = 0; i < this.boxes.length; i++) {
            for (let j = 0; j < this.boxes[i].length; j++) {
                if (this.lastDir[i][j] === 'downright') {
                    if (this.boxes[i][j].y >= this.height - this.size) {
                        this.dir[i][j] = 'upright';
                    }
                    if (this.boxes[i][j].x >= this.width - this.size) {
                        this.dir[i][j] = 'downleft';
                    }
                }
                if (this.lastDir[i][j] === 'downleft') {
                    if (this.boxes[i][j].y >= this.height - this.size) {
                        this.dir[i][j] = 'upleft';
                    }
                    if (this.boxes[i][j].x <= 0) {
                        this.dir[i][j] = 'downright';
                    } 
                }
                if (this.lastDir[i][j] === 'upright') {
                    if (this.boxes[i][j].y <= 0) {
                        this.dir[i][j] = 'downright';
                    }
                    if (this.boxes[i][j].x >= this.width - this.size) {
                        this.dir[i][j] = 'upleft';
                    }
                }
                if (this.lastDir[i][j] === 'upleft') {
                    if (this.boxes[i][j].y <= 0) {
                        this.dir[i][j] = 'downleft';
                    }
                    if (this.boxes[i][j].x <= 0) {
                        this.dir[i][j] = 'upright';
                    } 
                }
                if (this.dir[i][j] === 'downright') {//go down and right
                    this.boxes[i][j].y += speed;
                    this.boxes[i][j].x += speed;
                }
                if (this.dir[i][j] === 'downleft') {//go down and left
                    this.boxes[i][j].y += speed;
                    this.boxes[i][j].x -= speed;
                }
                if (this.dir[i][j] === 'upright') {//go up and right
                    this.boxes[i][j].y -= speed;
                    this.boxes[i][j].x += speed;
                }
                if (this.dir[i][j] === 'upleft') {//go up and left
                    this.boxes[i][j].y -= speed;
                    this.boxes[i][j].x -= speed;
                }
                this.lastDir[i][j] = this.dir[i][j];
                this.boxes[i][j].draw(this.ctx);
            }
        }
    }
}
canvas.init();
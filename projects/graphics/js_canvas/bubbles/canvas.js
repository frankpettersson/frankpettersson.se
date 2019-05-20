//___________________________________________________________
const canvas = {
    id: document.getElementById('canvas'),
    width: document.body.clientWidth,
    height: document.body.clientHeight
};
canvas.id.width = canvas.width;
canvas.id.height = canvas.height;
const ctx = canvas.id.getContext('2d');
//___________________________________________________________

//___________________________________________________________
class Ball {
    constructor(x, y, radius, speed, direction) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.speed = speed;
        this.direction = direction;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    update() {
        this.nX = this.x + this.speed * Math.cos(this.direction);
        this.nY = this.y + this.speed * Math.sin(this.direction);
        let radius = this.radius,
            borderUP = 0 - radius, 
            borderRIGHT = canvas.width + radius,
            borderDOWN = canvas.height + radius,
            borderLEFT = 0 - radius;
        if (this.x > borderRIGHT) {
            this.x = canvas.width - canvas.width - radius;
        } else if (this.y > borderDOWN) {
            this.y = canvas.height - canvas.height - radius;
        } else if (this.x < borderLEFT) {
            this.x = canvas.width + radius;
        } else if (this.y < borderUP) {
            this.y = canvas.height + radius;
        }
    }
}
//___________________________________________________________

//___________________________________________________________
const bubbles = [];
for (let i = 0; i < 100; i++) {
    let radius = 4 * Math.floor((Math.random() * 4) + 1),
        x = Math.floor((Math.random() * (canvas.width + radius)) + (0 - radius)),
        y = Math.floor((Math.random() * (canvas.height + radius)) + (0 - radius)),
        speed = 3,
        direction = Math.PI * 2,
        bubble = new Ball(x, y, radius, speed, direction);
    bubbles.push(bubble);
}
//___________________________________________________________

//___________________________________________________________
function loop() {
    window.requestAnimationFrame(loop);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].x += Math.cos(Math.sin(bubbles[i].y));
        bubbles[i].draw();
    }
}
loop();
//___________________________________________________________
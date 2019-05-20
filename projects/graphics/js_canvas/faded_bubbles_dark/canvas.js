//___________________________________________________________
const canvas = {
    id: document.getElementById('canvas'),
    width: window.innerWidth,
    height: window.innerHeight
};
canvas.id.width = canvas.width;
canvas.id.height = canvas.height;
const ctx = canvas.id.getContext('2d');
//___________________________________________________________

//___________________________________________________________
class Ball {
    constructor(x, y, radius, speed, direction, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.speed = speed;
        this.direction = direction;
        this.color = color;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
    }

    update() {
        this.nX = this.x + this.speed * Math.cos(this.direction);
        this.nY = this.y + this.speed * Math.sin(this.direction);
        let borderUP = 0 - this.radius, 
            borderRIGHT = canvas.width + this.radius,
            borderDOWN = canvas.height + this.radius,
            borderLEFT = 0 - this.radius;
        if (this.x > borderRIGHT) {
            this.x = canvas.width - canvas.width - this.radius;
        } else if (this.y > borderDOWN) {
            this.y = canvas.height - canvas.height - this.radius;
        } else if (this.x < borderLEFT) {
            this.x = canvas.width + this.radius;
        } else if (this.y < borderUP) {
            this.y = canvas.height + this.radius;
        }
    }
}
//___________________________________________________________

//___________________________________________________________
const bubbles = [];
for (let i = 0; i < 250; i++) {
    let radius = 4 * Math.random() * (6 - 3) + 3,
        x = Math.floor((Math.random() * (canvas.width + radius)) + (0 - radius)),
        y = Math.floor((Math.random() * (canvas.height + radius)) + (0 - radius)),
        speed = 3,
        direction = Math.PI * 2,
        color = "rgba(255, 255, 255,"+radius/Math.clz32(radius)+")",
        bubble = new Ball(x, y, radius, speed, direction, color);
    bubbles.push(bubble);
}
//___________________________________________________________

//___________________________________________________________
function loop() {
    window.requestAnimationFrame(loop);
    ctx.fillStyle = 'rgb(20, 20, 20)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].x += bubbles[i].radius/Math.clz32(bubbles[i].radius);
        bubbles[i].draw();
    }
}
loop();
//___________________________________________________________
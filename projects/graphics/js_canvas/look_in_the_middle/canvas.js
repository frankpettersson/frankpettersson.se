const canvas = {
    id: document.getElementById('canvas'),
    width: document.body.clientWidth,
    height: document.body.clientHeight
};
canvas.id.width = canvas.width;
canvas.id.height = canvas.height;
const ctx = canvas.id.getContext('2d');

let shape = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: Math.min(canvas.width/4, canvas.height/4)-10,
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x-this.radius, this.y, this.radius, 0, Math.PI);
        ctx.stroke();
    }
}

let rotationSpeed = -100;
let reset = 0;
function loop() {
    requestAnimationFrame(loop);
    reset++;
    if (reset > 10000) {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        reset = 0;
    }
    ctx.translate(shape.x, shape.y);
    ctx.rotate(rotationSpeed);
    ctx.translate(shape.x*-1, shape.y*-1);
    shape.draw();
} loop();
//___________________________________________________________
let canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//___________________________________________________________

//___________________________________________________________
class Pixel {
    constructor(x, y, width, height, properties) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.hsl = {h: 0, s: 0, l: 0};
        this.hsl.h = properties.hsl.h;
        this.hsl.s = properties.hsl.s;
        this.hsl.l = properties.hsl.l;
        this.hState = true;
        this.sState = true;
        this.lState = true;
        this.color = properties.color ? properties.color : 'hsl(' + properties.hsl.h + ', ' + properties.hsl.s + '%, ' + properties.hsl.l + '%)';
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color();
        ctx.strokeStyle = this.color();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.stroke();
    }
}
//___________________________________________________________

//___________________________________________________________
const factor = canvas.width / 30;
const pixels = [];
for (let i = 0; i < canvas.width/factor; i++) {
    let x = factor * i;
    for (let j = 0; j < canvas.height/factor; j++) {
        let y = factor * j,
            width = factor,
            height = factor,
            pixel = new Pixel(x, y, width, height, {
                hsl: {h: 0, s: 20, l: 50},
                color: function() {
                    return 'hsl(' + this.hsl.h + ', ' + this.hsl.s + '%, ' + this.hsl.l + '%)';
                }
            });
        pixels.push(pixel);
    }
}
//___________________________________________________________

//___________________________________________________________
function loop() {
    window.requestAnimationFrame(loop);
    ctx.globalCompositeOperation = 'source-in';
    ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].hsl.h += pixels[i].hState ? Math.floor((Math.random() * 5)) : 1*-(Math.floor((Math.random() * 5)));
        pixels[i].hsl.s += pixels[i].sState ? Math.floor((Math.random() * 2)) : 1*-(Math.floor((Math.random() * 2)));
        pixels[i].hsl.l += pixels[i].lState ? Math.floor((Math.random() * 2)) : 1*-(Math.floor((Math.random() * 2)));
        if (pixels[i].hsl.h >= 360) pixels[i].hState = false;
        if (pixels[i].hsl.h <= 0)   pixels[i].hState = true;
        if (pixels[i].hsl.s >= 100) pixels[i].sState = false;
        if (pixels[i].hsl.s <= 20)  pixels[i].sState = true;
        if (pixels[i].hsl.l >= 80)  pixels[i].lState = false;
        if (pixels[i].hsl.l <= 50)  pixels[i].lState = true;
        pixels[i].draw();
    }
}
loop();
//___________________________________________________________
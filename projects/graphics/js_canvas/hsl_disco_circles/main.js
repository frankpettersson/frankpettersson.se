let canvas = document.querySelector('canvas');
let ctx = document.querySelector('canvas').getContext('2d');
let shapes = [];
class Circle {
    constructor(x, y, radius, properties) {
        this.radius = radius;
        this.diameter = radius * 2;
        this.x = x;
        this.y = y;
        this.stroke = properties.stroke ? properties.stroke : false;
        this.fill = properties.fill ? properties.fill : false;
        this.hsl = {h: 0, s: 0, l: 0};
        this.hsl.h = properties.hsl.h;
        this.hsl.s = properties.hsl.s;
        this.hsl.l = properties.hsl.l;
        this.hState = true;
        this.sState = true;
        this.lState = true;
        this.color = properties.color ? properties.color : 'hsl(' + properties.hsl.h + ', ' + properties.hsl.s + '%, ' + properties.hsl.l + '%)';
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
}
const root = {
    init: function() {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        this.createShapes();
        this.animate();
    },
    createShapes: function() {
        let size = Math.min(document.body.clientWidth, document.body.clientHeight)/50;
        for (let i = 0; i < Math.floor(document.body.clientWidth / size)/2; i++) {
            for (let j = 0; j < Math.floor(document.body.clientHeight / size)/2; j++) {
                let shape = new Circle(size+(size*2)*i, size+(size*2)*j, size, {
                    fill: true,
                    stroke: true,
                    hsl: {h: 0, s: 20, l: 50},
                    color: function() {
                        return 'hsl(' + this.hsl.h + ', ' + this.hsl.s + '%, ' + this.hsl.l + '%)';
                    }
                });
                shapes.push(shape);
            }
        }
    },
    animate: function() {
        window.requestAnimationFrame(this.animate.bind(this));
        ctx.globalCompositeOperation = 'source-in';
        ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
        ctx.globalCompositeOperation = 'source-over';
        for (let i = 0; i < shapes.length; i++) {
            shapes[i].hsl.h += shapes[i].hState ? Math.floor((Math.random() * 5)) : 1*-(Math.floor((Math.random() * 5)));
            shapes[i].hsl.s += shapes[i].sState ? Math.floor((Math.random() * 2)) : 1*-(Math.floor((Math.random() * 2)));
            shapes[i].hsl.l += shapes[i].lState ? Math.floor((Math.random() * 2)) : 1*-(Math.floor((Math.random() * 2)));
            if (shapes[i].hsl.h >= 360) {shapes[i].hState = false;}
            if (shapes[i].hsl.h <= 0) {shapes[i].hState = true;}
            if (shapes[i].hsl.s >= 100) {shapes[i].sState = false;}
            if (shapes[i].hsl.s <= 20) {shapes[i].sState = true;}
            if (shapes[i].hsl.l >= 80) {shapes[i].lState = false;}
            if (shapes[i].hsl.l <= 50) {shapes[i].lState = true;}
            shapes[i].draw(ctx);
        }
    }
}
root.init();
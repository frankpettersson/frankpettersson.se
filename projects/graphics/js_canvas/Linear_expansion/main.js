stop = 0;
loop = 0;
let number;
function a(n) {
    let num = n;
    for (let i = 0; i < 1000; i++) {
        if (n === 360) {
            return true;
        }
        n += num;
    }
    return false;
}
function c(n) {
    if(a(n) === true) {
        return n;
    } else {
        if(stop > 100) {
            stop = 0;
            return;
        } else {
            stop++;
            loop++;
            number = Math.floor((Math.random() * 180));
            c(number);
        }
    }
}
function b() {
    number = Math.floor((Math.random() * 180));
    for (let i = 0; i < 1000; i++) {
        c(number);
    }
}
b();
number = 60;
let newC = 0;
let canvas = {
    id: document.querySelector('canvas'),
    ctx: document.querySelector('canvas').getContext('2d'),
    init: function() {
        this.id.width = document.body.clientWidth;
        this.id.height = document.body.clientHeight;
        this.shape();
        this.animate();
        window.addEventListener('resize', canvas.onWindowResize, false);
    },
    shapes: [],
    shape: function() {
        let s = new Circle(document.body.clientWidth/2, document.body.clientHeight/2, 0);
        s.c = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        this.shapes.push(s);
    },
    //l: Math.random() * 5,
    l: 0.3,
    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].r += this.l;
            this.shapes[i].a += number;
            this.shapes[i].x += 10*Math.sin(this.shapes[i].a*(Math.PI/180));
            this.shapes[i].y += 10*Math.cos(this.shapes[i].a*(Math.PI/180));
            this.shapes[i].draw(this.ctx);
        }
        newC++;
        if (newC >= 500) {
            b();
            this.shape();
            newC = 0;
        }
    },
    onWindowResize: function() {
        canvas.id.width = document.body.clientWidth;
        canvas.id.height = document.body.clientHeight;
    }
}
canvas.init();
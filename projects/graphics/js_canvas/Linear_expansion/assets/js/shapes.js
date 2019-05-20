class Box {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = 0;
    }
    draw(ctx) {
        if (this.a > 360) {
            this.a = 0;  
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = 0;
        this.c = c;
    }
    draw(ctx) {
        if (this.a >= 360) {
            this.a = 0;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.strokeStyle = this.c;
        ctx.stroke();
    }
}
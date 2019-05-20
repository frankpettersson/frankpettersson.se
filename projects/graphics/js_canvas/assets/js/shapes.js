'use strict';
class Box {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = 0;
        this.c = 'black';
    }
    draw(ctx) {
        if (this.a > 360) {
            this.a = 0;  
        }
        ctx.strokeStyle = this.c;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = 0;
        this.c = 'black';
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

class Triangle {
    constructor(x, y, len) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.a = 0;
        this.c = 'black';
    }
    draw(ctx) {
        if (this.a >= 360) {
            this.a = 0;
        }
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.moveTo(this.x, this.y - (this.len/2));
        ctx.lineTo(this.x + (this.len/2), this.y + (this.len/2));
        ctx.lineTo(this.x - (this.len/2), this.y + (this.len/2));
        ctx.closePath();
        ctx.strokeStyle = this.c;
        ctx.stroke();
    }
}

export const shape = {Box, Circle, Triangle};
export default shape;
'use strict';
import Shape from '../assets/js/shapes.js';
let canvas = {
    id: document.querySelector('canvas'),
    ctx: document.querySelector('canvas').getContext('2d'),
    shapes: [],
    init: function() {
        this.id.width = document.body.clientWidth;
        this.id.height = document.body.clientHeight;
        this.createShapes();
        this.animate();
    },
    createShapes: function() {
        let size = 10;
        let times = 20;
        for (let i = 0; i < times; i++) {
            this.shapes.push(new Shape.Box(document.body.clientWidth/(times/((times/2)-1))+size*i, document.body.clientHeight/(times/((times/2)-1))+size*i, size, size));
        }
    },
    clearLastShapeLocation: function(shape, clearStrength = 1, ctx = this.ctx) {
        shape.c = 'white';
        for (let j = 0; j < clearStrength; j++) {
            shape.x -= 1;
            shape.draw(ctx);
        }
        for (let j = 0; j < clearStrength; j++) {
            shape.x += 1;
            shape.draw(ctx);
        }
        for (let j = 0; j < clearStrength; j++) {
            shape.x += 1;
            shape.draw(ctx);
        }
        for (let j = 0; j < clearStrength; j++) {
            shape.x -= 1;
            shape.draw(ctx);
        }
        for (let j = 0; j < clearStrength; j++) {
            shape.y -= 1;
            shape.draw(ctx);
        }
        for (let j = 0; j < clearStrength; j++) {
            shape.y += 1;
            shape.draw(ctx);
        }
        for (let j = 0; j < clearStrength; j++) {
            shape.y += 1;
            shape.draw(ctx);
        }
        for (let j = 0; j < clearStrength; j++) {
            shape.y -= 1;
            shape.draw(ctx);
        }
        shape.c = 'black';
    },
    moveShapeInCircle: function(shape, circleSize = 1, turnAngle = 1) {
        shape.a += turnAngle;
        shape.x += circleSize*Math.sin(shape.a*(Math.PI/180));
        shape.y += circleSize*Math.cos(shape.a*(Math.PI/180));
    },
    rotateCanvas: function(canvasAxisX, canvasAxisY, ctx = this.ctx) {
        ctx.translate(canvasAxisX, canvasAxisY);
        ctx.rotate(0.1);
        ctx.translate(canvasAxisX*-1, canvasAxisY*-1);
    },
    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        for (let i = 0; i < this.shapes.length; i++) {
            this.clearLastShapeLocation(this.shapes[i], 1);
            this.rotateCanvas(this.shapes[i].x, this.shapes[i].y);
            this.moveShapeInCircle(this.shapes[i], 10, 1);
            this.shapes[i].draw(this.ctx);
        }
    }
}
canvas.init();
window.addEventListener('resize', function() {
    canvas.id.width = document.body.clientWidth;
    canvas.id.height = document.body.clientHeight;
}, false);
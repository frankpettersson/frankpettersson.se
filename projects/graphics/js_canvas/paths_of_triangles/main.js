'use strict';
import Shape from '../assets/js/shapes.js';
let canvas = {
    id: document.querySelector('canvas'),
    ctx: document.querySelector('canvas').getContext('2d'),
    init: function() {
        this.id.width = document.body.clientWidth;
        this.id.height = document.body.clientHeight;
        this.createShapes();
        this.animate();
        window.addEventListener('resize', canvas.onWindowResize, false);
    },
    shapes: [],
    createShapes: function() {
        canvas.shapes.push(new Shape.Triangle(document.body.clientWidth/2, document.body.clientHeight/2, 50));
        canvas.shapes.push(new Shape.Triangle(document.body.clientWidth/4, document.body.clientHeight/2, 50));
        canvas.shapes.push(new Shape.Triangle(document.body.clientWidth/4-5, document.body.clientHeight/2, 50));
    },
    l: Math.random() * 5,
    speed: 2,
    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].c = 'white';
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].x -= this.speed;
                this.shapes[i].draw(this.ctx);
            }
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].x += this.speed;
                this.shapes[i].draw(this.ctx);
            }
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].x += this.speed;
                this.shapes[i].draw(this.ctx);
            }
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].x -= this.speed;
                this.shapes[i].draw(this.ctx);
            }
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].y -= this.speed;
                this.shapes[i].draw(this.ctx);
            }
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].y += this.speed;
                this.shapes[i].draw(this.ctx);
            }
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].y += this.speed;
                this.shapes[i].draw(this.ctx);
            }
            for (let i = 0; i < this.speed; i++) {
                this.shapes[i].y -= this.speed;
                this.shapes[i].draw(this.ctx);
            }
            this.shapes[i].c = 'black';

            this.shapes[i].a += 1;
            this.shapes[i].x += this.speed*Math.sin(this.shapes[i].a*(Math.PI/180));
            this.shapes[i].y += this.speed*Math.cos(this.shapes[i].a*(Math.PI/180));
            this.shapes[i].draw(this.ctx);
        }
    },
    onWindowResize: function() {
        canvas.id.width = document.body.clientWidth;
        canvas.id.height = document.body.clientHeight;
    }
}
canvas.init();
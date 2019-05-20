//___________________________________________________________________
document.querySelector('#stage').style.width = '400px';
document.querySelector('#stage').style.height = '400px';
const stage = {
    id: document.getElementById('stage'),
    width: 400,
    height: 400,
    centerX: function () {
        return Math.round(this.width / 2);
    },
    centerY: function () {
        return Math.round(this.height / 2);
    },
    diagonal: function () {
        let w = this.width;
        let h = this.height;
        let diag = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
        return Math.round(diag);
    }
};
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const canvas3 = document.getElementById('canvas3');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');
//___________________________________________________________________
function translate(obj) {
    let a = obj.x;
    let b = obj.y;
    let width = obj.width;
    let height = obj.height;
    let x1 = (a + width / 2);
    let x2 = x1 - x1*2;
    let y1 = (b + height / 2);
    let y2 = y1 - y1*2;
    return {
        x1,
        x2,
        y1,
        y2
    }
}
//___________________________________________________________________
var gradient = ctx1.createLinearGradient(0, 0, 170, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5" ,"blue");
gradient.addColorStop("1.0", "red");
let cross = {
    x1: 0,
    y1: 0,
    x2: Math.round(stage.width),
    y2: Math.round(stage.height),
    ctx: ctx1,
    clear: function () {
        this.ctx.clearRect(0, 0, stage.diagonal(), stage.diagonal());
    },
    draw: function () {
        //this.clear();
        ctx1.beginPath();
        ctx1.moveTo(this.x1, this.y1);
        ctx1.lineTo(this.x2, this.y2);
        ctx1.strokeStyle = gradient;
        ctx1.stroke();
        ctx1.beginPath();
        ctx1.moveTo(this.x2, this.y1);
        ctx1.lineTo(this.x1, this.y2);
        ctx1.stroke();
    }
}
cross.draw();

class Line {
    constructor(x1, y1, x2, y2) {
        this.x = x1;
        this.y = y1;
        this.x = x2;
        this.y = y2;
        this.r = Math.floor((Math.random() * 255) + 1);
        this.g = Math.floor((Math.random() * 255) + 1);
        this.b = Math.floor((Math.random() * 255) + 1);
        this.strokeStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        this.ctx = ctx1;
        this.draw();
    }
    draw() {
        this.clear();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1, this.y1);
        this.ctx.lineTo(this.x2, this.y2);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.stroke();
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.r = Math.floor((Math.random() * 255) + 1);
        this.g = Math.floor((Math.random() * 255) + 1);
        this.b = Math.floor((Math.random() * 255) + 1);
        this.strokeStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        this.fillStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        this.ctx = ctx2;
        this.draw();
    }

    draw() {
        this.clear();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.stroke();
        this.ctx.fill();
    }

    clear() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, stage.diagonal(), stage.diagonal());
    }
}
class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r = Math.floor((Math.random() * 255) + 1);
        this.g = Math.floor((Math.random() * 255) + 1);
        this.b = Math.floor((Math.random() * 255) + 1);
        this.fillStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        this.strokeStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        this.ctx = ctx2;
        this.draw();
    }
    draw() {
        this.clear();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.strokeStyle;
        this.ctx.strokeStyle = this.fillStyle;
        this.ctx.fill();
        this.ctx.stroke();
    }
    clear() {
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.restore();
    }
}
//___________________________________________________________________

function loop() {
    requestAnimationFrame(loop);
    ctx1.translate(200, 200);
    ctx1.rotate(0.05);
    ctx1.translate(-200, -200);        
    let r1 = Math.floor((Math.random() * 255) + 1);
    let g1 = Math.floor((Math.random() * 255) + 1);
    let b1 = Math.floor((Math.random() * 255) + 1);
    let r2 = Math.floor((Math.random() * 255) + 1);
    let g2 = Math.floor((Math.random() * 255) + 1);
    let b2 = Math.floor((Math.random() * 255) + 1);
    let r3 = Math.floor((Math.random() * 255) + 1);
    let g3 = Math.floor((Math.random() * 255) + 1);
    let b3 = Math.floor((Math.random() * 255) + 1);
    let color1 = "rgb("+r1+", "+g1+", "+b1+")";
    let color2 = "rgb("+r2+", "+g2+", "+b2+")";
    let color3 = "rgb("+r3+", "+g3+", "+b3+")";
    gradient.addColorStop("0", color1);
    gradient.addColorStop("0.5", color2);
    gradient.addColorStop("1.0", color3);
    ctx1.strokeStyle = gradient;
    cross.draw();
}
loop();
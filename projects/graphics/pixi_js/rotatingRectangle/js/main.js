/* eslint-disable */
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

let app = new Application({ 
    width: 512, 
    height: 512,                       
    antialias: true, 
    transparent: true, 
    resolution: 1
});

document.getElementById('display').appendChild(app.view);

loader
    .load(setup);

function setup() {
    let g = new PIXI.Graphics();

    g.lineStyle(1, 0x000000, 1);
    g.drawRoundedRect(0, 0, 50, 50, 50);

    g.x = 256;
    g.y = 256;

    g.pivot.x = g.width / 2;
    g.pivot.y = g.height / 2;
    
    app.stage.addChild(g);

    app.ticker.add(delta => gameLoop(delta));

    function gameLoop(delta){
        g.rotation += 0.05;
        g.width += 0.1;
    }
}
/* eslint-disable */
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

let appWidth = 400,
    appHeight = 400;

let app = new Application({ 
    width: appWidth, 
    height: appHeight,                       
    antialias: true, 
    transparent: true, 
    resolution: 1
});
document.getElementById('display').appendChild(app.view);

loader
    .load(setup);

function setup() {
    //DEFINE POLYGON POINTS______________________
    let pointArray1 = [
        x0 = 0, y0 = 0,
        x1 = 10, y1 = 50,
        x2 = 0, y2 = 100,
        x3 = -10, y3 = 50,
        x4 = 0, y4 = 0,
    ];
    let pointArray2 = [
        x0 = 0, y0 = 0,
        x1 = 50, y1 = 10,
        x2 = 100, y2 = 0,
        x3 = 50, y3 = -10,
        x4 = 0, y4 = 0,
    ];
    let gx1 = [],
        gy1 = [],
        gxIterator1 = 0,
        gyIterator1 = 0,
        gx2 = [],
        gy2 = [],
        gxIterator2 = 0,
        gyIterator2 = 0;
    for (let i = 0; i <= pointArray1.length; i++) {
        if (i % 2 === 0) {
            gx1[gxIterator1] = pointArray1[i];
            gxIterator1++;
            gx2[gxIterator2] = pointArray2[i];
            gxIterator2++;
        } else {
            gy1[gyIterator1] = pointArray1[i];
            gyIterator1++;
            gy2[gyIterator2] = pointArray2[i];
            gyIterator2++;
        }
    }
    let fPoints = [];
    let points1 = [];
    let points2 = [];
    for (let i = 0; i < pointArray1.length / 2; i++) {
        fPoints.push({x : gx1[i], y: gy1[i]});
        fPoints.push({x : gx2[i], y: gy2[i]});
        points1.push(gx1[i], gy1[i]);
        points2.push(gx2[i], gy2[i]);
    }
    console.log(fPoints);
    console.log(pointArray1);
    console.log(points1);
    console.log(pointArray2);
    console.log(points2);
    //___________________________________________*
    
    //GET CENTROID OF POLYGON____________________
    function get_polygon_centroid(pts) {
        var first = pts[0],
            last = pts[pts.length - 1];
        if (first.x != last.x || first.y != last.y) pts.push(first);
        var twicearea = 0,
            x = 0,
            y = 0,
            nPts = pts.length,
            p1, p2, f;
        for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
            p1 = pts[i];
            p2 = pts[j];
            f = p1.x * p2.y - p2.x * p1.y;
            twicearea += f;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
        }
        f = twicearea * 3;
        return {
            x: x / f,
            y: y / f
        };
    }
    let centroid = get_polygon_centroid(fPoints);
    console.log(centroid);
    //___________________________________________*

    //DRAW THE SHAPE_____________________________
    let g = new PIXI.Graphics();
    g.beginFill(0x000000);
    g.drawPolygon(points1);
    g.drawPolygon(points2);
    //g.addHole()

    g.x = appWidth / 2;
    g.y = appHeight / 2;
    g.pivot.set(centroid.x, centroid.y);

    app.stage.addChild(g);    
    //___________________________________________*

    //LOOP/UPDATER_______________________________
    app.ticker.add(delta => gameLoop(delta));
    function gameLoop(delta) {
        g.rotation += 0.01;
    }
    //___________________________________________
}
//___________________________________________
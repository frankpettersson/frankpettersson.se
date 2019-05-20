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
    let polygon = [],
        polyAmount = 2,
        polyPoints = 3,
        polyLineLengthMaxX = 200,
        polyLineLengthMinX = 10,
        polyLineLengthMaxY = 200,
        polyLineLengthMinY = 10,
        polyX, polyY,
        endX, endY;
    for (let a = 0; a < polyAmount; a++) {
        console.log('Mapping polygon #'+(a+1));
        polygon[a] = [];
        for (let b = 0; b < polyPoints; b++) {
            if (b === 0 && a !== 0) {
                console.log('Getting last point, x:'+polyX+' y:'+polyY);
                polygon[a].push(polyX);
                polygon[a].push(polyY);
            } else if (b == (polyPoints - 1) && a === (polyAmount - 1)) {
                console.log('Getting end point, x:'+endX+' y:'+endY);
                polygon[a].push(endX);
                polygon[a].push(endY);
            } else {
                polyX = Math.floor((Math.random() * polyLineLengthMaxX) + polyLineLengthMinX);
                polyY = Math.floor((Math.random() * polyLineLengthMaxY) + polyLineLengthMinY);
                polygon[a].push(polyX);
                polygon[a].push(polyY);
                if (b === (polyPoints - 1) && a < (polyAmount - 1)) {
                    console.log('Saving last point, x:'+polyX+' y:'+polyY);
                    lastX = polyX;
                    lastY = polyY;
                } else if (b === 0 && a === 0) {
                    console.log('Saving end point, x:'+polyX+' y:'+polyY);
                    endX = polyX;
                    endY = polyY;
                }
            }
        }
        console.log('End polygon #'+(a+1));
        console.log(polygon[a]);
        console.log('');
    }
    console.log('Shape created('+polyAmount+' polygons('+polyPoints+' coordinates))');

    let x = [], y = [],
        xIterator = [], yIterator = [],
        points = [], fPoints = [];
    for (let j = 0; j < polygon.length; j++) { 
        x[j] = [];
        y[j] = [];
        xIterator[j] = 0;
        yIterator[j] = 0;
        points[j] = [];
        fPoints[j] = [];
        for (let i = 0; i < polygon[j].length; i++) {
            if (i % 2 === 0) {
                x[j][xIterator[j]] = polygon[j][i];
                xIterator[j]++;
            } else {
                y[j][yIterator[j]] = polygon[j][i];
                yIterator[j]++;
            }
        }
        for (let i = 0; i < polygon[j].length / 2; i++) {
            fPoints[j].push({x : x[j][i], y: y[j][i]});
            points[j].push(x[j][i], y[j][i]);
        }
    }

    //___________________________________________*
    
    //GET CENTROID OF POLYGON____________________
    function getPolygonCentroid(points){ 
        let centroid = {x: 0, y: 0};
        for(let i = 0; i < points.length; i++) {
           let point = points[i];
           centroid.x += point.x;
           centroid.y += point.y;
        }
        centroid.x /= points.length;
        centroid.y /= points.length;
        return centroid;
      } 
    let centroid = [], centroidX = [], centroidY = [];
    for (let i = 0; i < polygon.length; i++) {
        centroid.push(getPolygonCentroid(fPoints[i]));
        centroidX.push(centroid[i].x);
        centroidY.push(centroid[i].y);
    } 
    let centroidXSum = centroidX.reduce((previous, current) => current += previous),
        centroidXAvg = centroidXSum / centroidX.length,
        centroidYSum = centroidY.reduce((previous, current) => current += previous),
        centroidYAvg = centroidYSum / centroidY.length;
    //___________________________________________*

    //DRAW THE SHAPE_____________________________
    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '0x';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    let g = new PIXI.Graphics();
    for (let i = 0; i < polygon.length; i++) { 
        let colour = getRandomColor();
        g.lineStyle(1, 0x000000, 1);
        g.beginFill(colour);
        g.drawPolygon(points[i]);
        g.endFill();
    }
    g.x = appWidth / 2;
    g.y = appHeight / 2;
    g.pivot.set(centroidXAvg, centroidYAvg);

    app.stage.addChild(g);
    //___________________________________________*

    //LOGS_______________________________________*
    /*console.log('points')
    console.log(points);
    console.log('fPoints');
    console.log(fPoints);
    console.log('centroid');
    console.log(centroid);
    console.log('centroidXAvg');
    console.log(centroidXAvg);
    console.log('centroidYAvg');
    console.log(centroidYAvg);*/
    //___________________________________________*

    //LOOP/UPDATER_______________________________
    app.ticker.add(delta => gameLoop(delta));
    function gameLoop(delta) {
        
        let state = Math.floor((Math.random() * 2) + 1);
        let poly = Math.floor((Math.random() * polygon.length) + 0);
        for (let i = 0; i < polygon.length; i++) {
            let point = Math.floor((Math.random() * polygon[i].length) + 0);
            for (let j = 0; j < polygon[i].length; j++) {
                if (state === 1) {
                    g.graphicsData[poly].shape.points[point] += 1;
                } else {
                    g.graphicsData[poly].shape.points[point] -= 1;
                }
            }
        }
        g.pivot.set(centroidXAvg, centroidYAvg);
        /*
        let len = g.graphicsData.length;    
        for (let i = 0; i < len; i++) {        
            let data = g.graphicsData[i];
            data.lineWidth = Math.floor(Math.random() * 5);
            data.lineColor = getRandomColor();
        }*/
        g.dirty++;
        g.clearDirty++;
    }
    //___________________________________________
}
//___________________________________________
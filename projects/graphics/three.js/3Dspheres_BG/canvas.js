//CREATE SCENE
var scene = new THREE.Scene();
scene.background = 0xfdffc1;
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(10, aspect, 0.1, 10000);
camera.position.set(0, 0, 2000);
camera.rotation.set(1, 1, 1);

var ambientLight = new THREE.AmbientLight(0xfdffc1); // soft white light
scene.add(ambientLight);

var light = new THREE.DirectionalLight(0xdddddd, 0.8);
light.position.set(0, 1, 0);
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

//CREATE RENDERER
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    precision: 'highp'
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//SHAPES
var shapes = new THREE.Group();
var count = 2000;
var area = count / 8;
var radius = 20; //1-20
var detail = 1; //0-5
for (var i = 0; i < count; i++) {
    var xRandom = Math.floor(Math.random() * ((radius * area) + 1)) - ((radius * area) / 2);
    var yRandom = Math.floor(Math.random() * ((radius * area) + 1)) - ((radius * area) / 2);
    var zRandom = Math.floor(Math.random() * ((radius * area) + 1)) - ((radius * area) / 2);
    var g = new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(radius, detail),
        new THREE.MeshPhongMaterial({
            flatShading: true
        })
    );
    g.material.color.r = Math.random() * 1;
    g.material.color.g = Math.random() * 1;
    g.material.color.b = Math.random() * 1;

    g.material.strokeColor = 'black';

    g.position.set(xRandom, yRandom, zRandom);
    gRadius = g.geometry.parameters.radius;
    shapes.add(g);
}

//ADD TO SCENE
scene.add(shapes);

//RENDER LOOP
var render = function () {
    requestAnimationFrame(render);

    for (var i = 0; i < count; i++) {
        shapes.children[i].rotation.y += 0.1;
    }
    camera.rotation.y += 0.0005;
    camera.rotation.x += 0.0005;
    camera.rotation.z += 0.0005;

    renderer.render(scene, camera);
};
render();
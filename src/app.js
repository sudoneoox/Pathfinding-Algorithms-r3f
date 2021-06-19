"use strict";
exports.__esModule = true;
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var STATS = require("stats.js");
var canvas;
var scene;
var camera;
var renderer;
var controls;
//Display FPS
var stats = new STATS();
stats.showPanel(0);
document.body.appendChild(stats.dom);
init();
animate();
function init() {
    canvas = document.getElementById('webgl');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight);
    camera.position.setZ(3);
    renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Add a cube to the scene.
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    var box = new THREE.Mesh(geometry, material);
    scene.add(box);
    //Add light to the scene
    var DirectionalLight = new THREE.DirectionalLight(0x0F0F0F, 10);
    DirectionalLight.position.setZ(2);
    DirectionalLight.position.setY(2);
    DirectionalLight.rotation.set(0, 0, -Math.PI / 2);
    scene.add(DirectionalLight);
    window.addEventListener("resize", onWindowResize, false);
    controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
}
function animate() {
    stats.begin();
    requestAnimationFrame(animate);
    render();
    stats.end();
}
function render() {
    if (controls) {
        controls.update();
    }
    renderer.clear();
    renderer.render(scene, camera);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

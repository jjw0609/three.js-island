import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import printIsland from "../mesh/island";
import prinTangerine from "../mesh/tangerine";
import printTree from "../mesh/tree";
import printMountain from "../mesh/mountain";
import printStone from "../mesh/stone";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ccad5);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight,
    0.1, 1000);
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// 도형
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({
//     color: 0xffe272
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const island = printIsland();
island.position.y = -1.5;
scene.add(island);

const tangerine = prinTangerine();
tangerine.position.set(-5, 0, -1);
scene.add(tangerine);
const miniTan = prinTangerine();
miniTan.scale.set(0.7, 0.7, 0.7);
miniTan.position.set(-6, 0, 1.5);
scene.add(miniTan);

const tree = printTree();
tree.position.set(5, -0.5, -1);
tree.rotation.y = Math.PI / -3;
scene.add(tree);
const miniTree = printTree();
miniTree.position.set(6, -1, 2);
miniTree.scale.set(0.6, 0.6, 0.6);
scene.add(miniTree);

const mountain = printMountain();
mountain.scale.set(1.2, 1.6, 1);
mountain.position.set(0, 1, -2);
scene.add(mountain);

const myChar = printStone();
myChar.position.set(3, -0.5, 1);
myChar.scale.set(0.9, 0.9, 0.9);
myChar.rotation.y = Math.PI / -8;
scene.add(myChar);

const modelLoader = new GLTFLoader();
modelLoader.load('../../src/models/bunny.glb', gltf => {
    const model = gltf.scene;
    model.position.set(-3, -1.29, 2);
    model.scale.set(0.4, 0.4, 0.4);
    model.rotation.y = Math.PI / 8;
    scene.add(model);

    for (const mesh of model.children) {
        mesh.castShadow = true;
    }
})

// 빛
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(-10, 10, 10);
scene.add(directionLight);
directionLight.castShadow = true;

const pl1 = new THREE.PointLight(0xff8c00, 1.5);
pl1.position.set(5, 0, -0.5);
scene.add(pl1);

const pl2 = new THREE.PointLight(0xffe287, 2);
pl2.position.set(-3, 2, 0);
scene.add(pl2);

// OrbitControls
const control = new OrbitControls(camera, renderer.domElement);
control.autoRotate = true;
control.autoRotateSpeed = -1;
control.minDistance = 10;
control.maxDistance = 30;

function animate() {
    control.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
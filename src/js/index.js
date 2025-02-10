import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import printTree from '../mesh/tree';
import prinTangerine from '../mesh/tangerine';
import printMountain from "../mesh/mountain";


const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
// scene.add(요소);

// 2. Camera: Scene 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({
    canvas: $result,
    antialias: true
});
renderer.setSize($result.clientWidth, $result.clientHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const fruit = prinTangerine();
fruit.position.x = -5;
scene.add(fruit);

const tree = printTree();
scene.add(tree);

const mountain = printMountain();
scene.add(mountain);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// controls.autoRotate = true;
controls.autoRotateSpeed = -10;
controls.enableDamping = true;


function animate() {
    // box.rotation.y += 0.01;
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
   // 1. 카메라의 종횡비
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix(); // 카메라 업데이트

    // 2. 렌더러의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);

});
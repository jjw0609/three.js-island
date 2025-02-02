import * as THREE from "three";
import {OrbitControls} from "three/addons";


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
camera.position.set(5, 5, 5);
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

// 한라봉
const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xff7f00
});
const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
scene.add(bottom);

const topGeometry = new THREE.TetrahedronGeometry(1, 2);
const top = new THREE.Mesh(topGeometry, bodyMaterial);
scene.add(top);
top.position.y = 1.7;

const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x008000,
    side: THREE.DoubleSide
});

const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
const stem = new THREE.Mesh(stemGeometry, leafMaterial);
scene.add(stem);
stem.position.y = 2.5;

const leafGeometry = new THREE.SphereGeometry(
    0.5, 32, 16, 0, Math.PI / 3
);
const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
scene.add(leaf);
leaf.position.set(-0.5, 2.4, -0.1);
leaf.rotation.z = Math.PI / -2;

// 나무


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
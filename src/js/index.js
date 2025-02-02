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
// const bodyMaterial = new THREE.MeshStandardMaterial({
//     color: 0xff7f00
// });
// const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
// const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
// scene.add(bottom);
//
// const topGeometry = new THREE.TetrahedronGeometry(1, 2);
// const top = new THREE.Mesh(topGeometry, bodyMaterial);
// scene.add(top);
// top.position.y = 1.7;
//
// const leafMaterial = new THREE.MeshStandardMaterial({
//     color: 0x008000,
//     side: THREE.DoubleSide
// });
//
// const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
// const stem = new THREE.Mesh(stemGeometry, leafMaterial);
// scene.add(stem);
// stem.position.y = 2.5;
//
// const leafGeometry = new THREE.SphereGeometry(
//     0.5, 32, 16, 0, Math.PI / 3
// );
// const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
// scene.add(leaf);
// leaf.position.set(-0.5, 2.4, -0.1);
// leaf.rotation.z = Math.PI / -2;

// 나무
const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0xa38049
});
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
scene.add(trunk1);

const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk2.position.set(0.1, 1.3, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
scene.add(trunk2);

const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk3.position.set(0.2, 2.5, 0);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
scene.add(trunk3);

const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk4.scale.set(0.7, 0.7, 0.7);
trunk4.position.set(0.3, 3.5, 0);
trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
scene.add(trunk4);

const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x84ad88,
    side: THREE.DoubleSide
});
const leaftGeometry = new THREE.SphereGeometry(
    2, 32, 16, Math.PI / 3, Math.PI / 3
);
const leaf1 = new THREE.Mesh(leaftGeometry, leafMaterial);
leaf1.rotation.x = Math.PI / -2;
leaf1.position.set(0, 3.2, 2);
scene.add(leaf1);

const leaf2 = new THREE.Mesh(leaftGeometry, leafMaterial);
leaf2.rotation.x = Math.PI / -2;
leaf2.rotation.z = Math.PI / 2;
leaf2.position.set(2, 3.2, 0);
scene.add(leaf2);

const leaf3 = new THREE.Mesh(leaftGeometry, leafMaterial);
leaf3.rotation.x = Math.PI / -2;
leaf3.rotation.z = Math.PI;
leaf3.position.set(0, 3.2, -2);
scene.add(leaf3);

const leaf4 = new THREE.Mesh(leaftGeometry, leafMaterial);
leaf4.rotation.x = Math.PI / -2;
leaf4.rotation.z = Math.PI / -2;
leaf4.position.set(-2, 3.2, 0);
scene.add(leaf4);

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
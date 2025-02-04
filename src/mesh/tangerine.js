import * as THREE from 'three';

export default function prinTangerine() {

    // 한라봉
    const tangerine = new THREE.Group();
    const body = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xff7f00
    });
    const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
    const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
    body.add(bottom);

    const topGeometry = new THREE.TetrahedronGeometry(1, 2);
    const top = new THREE.Mesh(topGeometry, bodyMaterial);
    top.position.y = 1.7;
    body.add(top);

    const leaves = new THREE.Group();
    const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x008000,
        side: THREE.DoubleSide
    });

    const stemGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.4);
    const stem = new THREE.Mesh(stemGeometry, leafMaterial);
    stem.position.y = 2.5;
    leaves.add(stem);

    const leafGeometry = new THREE.SphereGeometry(
        0.5, 32, 16, 0, Math.PI / 3
    );
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(-0.5, 2.4, -0.1);
    leaf.rotation.z = Math.PI / -2;

    leaves.add(leaf);

    tangerine.add(body);
    tangerine.add(leaves);

    return tangerine;
}
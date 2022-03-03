import * as THREE from 'three';
import Wizard from '@depasquale/three-wizard';
import StatsMesh from '../build/three-stats-mesh.js'; // npm: '@depasquale/three-stats-mesh'

const wizard = new Wizard({
  controls: 'OrbitControls',
});

const { scene } = wizard;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(0, 1, -1);
scene.add(ambientLight, directionalLight);

// Floor
const floorGeometry = new THREE.PlaneBufferGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x333333,
  metalness: 0.2,
  roughness: 0.4,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Stats mesh
const statsMesh = new StatsMesh();
statsMesh.object.position.y = 1;
statsMesh.object.position.x = -2;
statsMesh.object.scale.setScalar(4);
scene.add(statsMesh.object);

// Icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const icosahedronMaterial = new THREE.MeshNormalMaterial();
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
icosahedron.position.y = 1;
scene.add(icosahedron);

const render = () => {
  statsMesh.stats.update();
  const time = Date.now();
  icosahedron.rotation.x = time * 0.0002;
  icosahedron.rotation.y = time * 0.0003;
};

wizard.start(render);

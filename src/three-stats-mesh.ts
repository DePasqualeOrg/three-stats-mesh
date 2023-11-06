/*!
Three.js Stats Mesh
Copyright 2023, Anthony DePasquale
*/

import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const textureLoader = new THREE.TextureLoader();

interface StatsMesh {
  stats: Stats,
  canvas: HTMLCanvasElement,
  texture: THREE.Texture,
  geometry: THREE.PlaneGeometry,
  material: THREE.MeshBasicMaterial,
  front: THREE.Mesh,
  back: THREE.Mesh,
  object: THREE.Group,
  timer: ReturnType<typeof setTimeout>,
}

class StatsMesh {
  constructor() {
    this.stats = new (Stats as any)(); // !! TypeScript hack
    this.canvas = this.stats.dom.children[0] as HTMLCanvasElement;
    this.createMesh();
    this.updateMesh();
    this.start();
  }
  createMesh() {
    const scale = 1 / (500 * window.devicePixelRatio);
    this.geometry = new THREE.PlaneGeometry(this.canvas.width * scale, this.canvas.height * scale);
    this.material = new THREE.MeshBasicMaterial({
      // transparent: true,
      // opacity: 0.6,
      // depthWrite: false,
    });
    this.front = new THREE.Mesh(this.geometry, this.material);
    this.back = this.front.clone();
    this.back.rotation.y = Math.PI;
    this.object = new THREE.Group();
    this.object.add(this.front, this.back);
  }
  updateMesh() {
    // Replace texture on object with current canvas of DOM element
    const img = this.canvas.toDataURL('image/png');
    textureLoader.load(img, (texture) => {
      this.texture?.dispose();
      this.texture = texture;
      if (this.front.material instanceof THREE.MeshBasicMaterial) {
        texture.minFilter = THREE.LinearFilter; // Prevents resizing to power of two
        this.front.material.map = this.texture;
        this.front.material.needsUpdate = true;
      }
    });
  }
  start() {
    // Start updating mesh every second
    this.timer = setInterval(() => {
      this.updateMesh();
    }, 1000);
  }
  stop() {
    // Stop updating mesh
    clearTimeout(this.timer);
  }
}

export default StatsMesh;

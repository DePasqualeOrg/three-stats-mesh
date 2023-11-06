/*!
Three.js Stats Mesh
Copyright 2023, Anthony DePasquale
*/
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
interface StatsMesh {
    stats: Stats;
    canvas: HTMLCanvasElement;
    texture: THREE.Texture;
    geometry: THREE.PlaneGeometry;
    material: THREE.MeshBasicMaterial;
    front: THREE.Mesh;
    back: THREE.Mesh;
    object: THREE.Group;
    timer: ReturnType<typeof setTimeout>;
}
declare class StatsMesh {
    constructor();
    createMesh(): void;
    updateMesh(): void;
    start(): void;
    stop(): void;
}
export default StatsMesh;

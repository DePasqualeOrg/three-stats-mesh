# Three.js Stats Mesh

This module allows you to place the [Stats](https://github.com/mrdoob/stats.js) indicator in a Three.js scene to monitor performance. This is particularly useful in immersive (VR) situations, when DOM elements are not visible.

### Installation

```
npm install @depasquale/three-stats-mesh
```

### Usage

Create an instance and make any desired adjustments to the object's position, scale, etc.:

```javascript
import StatsMesh from '@depasquale/three-stats-mesh';

// Set up the Three.js scene
// ...

const statsMesh = new StatsMesh();
statsMesh.object.position.y = 1;
statsMesh.object.position.x = -2;
statsMesh.object.scale.setScalar(4);
scene.add(statsMesh.object);
```

Add the Stats element to the DOM if desired:

```javascript
document.body.appendChild(statsMesh.stats.dom);
```

Add this to the render loop:

```javascript
statsMesh.stats.update();
```

Before removing the element, call this to stop the `setInterval` timer:

```javascript
statsMesh.stop();
```

### Example

A full example is provided in the `example` directory. To try it locally in your browser, run:
```
npm run example
```

Or try it [here](https://unpkg.com/@depasquale/three-stats-mesh/example/index.html).

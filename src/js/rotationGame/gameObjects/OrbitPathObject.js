'use strict';

import GameNode from './GameNode.js';

export default class OrbitPathObject extends GameNode {
  constructor(mesh) {
    super(mesh, false);
    this.parentOrbitDistance = null;
  }

  addParentSystem(system) {
    // use parent system to know how big the orbit is
    this.localMatrix.scale(system.orbitDistance);
    this.parentOrbitDistance = system.orbitDistance;
    super.addParentObject(system);
  }

  updateLocalMatrix() {
    if (this.parentOrbitDistance !== this.parentNode.orbitDistance) {
      const scaleDiff = 1 + (this.parentNode.orbitDistance - this.parentOrbitDistance);
      this.localMatrix.scale(scaleDiff);
      this.parentOrbitDistance = this.parentNode.orbitDistance;
    }
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

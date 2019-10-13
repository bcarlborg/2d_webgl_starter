'use strict';

import GameNode from './GameNode.js';

export default class OrbitPathObject extends GameNode {
  constructor(mesh) {
    super(mesh, false);
  }

  addParentSystem(system) {
    // use parent system to know how big the orbit is
    this.localMatrix.scale(system.orbitDistance);
    super.addParentObject(system);
  }

  updateLocalMatrix() {
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

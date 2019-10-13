'use strict';

import GameNode from './GameNode.js';

export default class OrbitPathObject extends GameNode {
  constructor(mesh) {
    super(mesh, false);
  }

  addParentObject(object) {
    this.localMatrix.scale(object.orbitDistance);
    super.addParentObject(object);
  }

  updateLocalMatrix() {
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

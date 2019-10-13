'use strict';

import GameNode from './GameNode.js';

export default class PlanetObject extends GameNode {
  constructor(mesh) {
    super(mesh, true);
  }

  addParentObject(object) {
    this.localMatrix.scale(object.centerPlanetSize);
    super.addParentObject(object);
  }

  updateLocalMatrix() {
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

'use strict';

import GameNode from './GameNode.js';

export default class PlanetObject extends GameNode {
  constructor(mesh) {
    super(mesh, true);
  }

  addParentSystem(system) {
    // use parent system to know what our size should be
    this.localMatrix.scale(system.centerPlanetSize);
    super.addParentObject(system);
  }

  updateLocalMatrix() {
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

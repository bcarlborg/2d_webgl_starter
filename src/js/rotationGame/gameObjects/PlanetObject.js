'use strict';

import GameNode from './GameNode.js';

export default class PlanetObject extends GameNode {
  constructor(mesh) {
    super(mesh, true);
    this.parentOrbitDistance = null;
  }

  toggleSelect() {
    if (!this.isSelected) super.unselectAll();
    super.toggleSelect();
    if (this.parentNode) this.parentNode.toggleSelect();
  }

  addParentSystem(system) {
    // use parent system to know what our size should be
    this.localMatrix.scale(system.centerPlanetSize);
    super.addParentObject(system);
  }

  updateLocalMatrix() {
    if (this.keysPressed.A && this.isSelected) {
      this.localMatrix.rotate(0.05);
    }
    if (this.keysPressed.D && this.isSelected) {
      this.localMatrix.rotate(-0.05);
    }
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

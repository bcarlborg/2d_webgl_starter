'use strict';

import matrixHelpers from '../../helpers/matrixHelpers.js';
import GameNode from './GameNode.js';

export default class SystemObject extends GameNode {
  constructor() {
    super(null, false);

    this.orbitPathObject = null;
    this.orbitDistance = 0.75;
    this.parentOrbitDistance = null;
    this.orbitRate = 0;

    this.centerPlanet = null;
    this.centerPlanetSize = null;
  }

  addParentSystem(system) {
    // translate ourselves using the orbit distance of parent system
    this.localMatrix.translate(system.orbitDistance, 0, 0);
    this.parentOrbitDistance = system.orbitDistance;
    super.addParentObject(system);
  }

  addCenterObject(planet, centerPlanetSize) {
    this.centerPlanet = planet;
    this.centerPlanetSize = centerPlanetSize;
    planet.addParentSystem(this);
  }

  addOrbitPath(pathObject, orbitDistance, orbitRate) {
    if (orbitDistance) this.orbitDistance = orbitDistance;
    if (orbitRate) this.orbitRate = orbitRate;
    this.orbitPathObject = pathObject;
    pathObject.addParentSystem(this);
  }

  updateLocalMatrixFromParent() {
    matrixHelpers.rotatePerSecond(this.localMatrix, this.parentNode.orbitRate);
    if (this.parentNode.orbitDistance !== this.parentOrbitDistance) {
      const orbitDiff = 1 + (this.parentNode.orbitDistance - this.parentOrbitDistance);
      this.localMatrix.scale(orbitDiff);
      this.parentOrbitDistance = this.parentNode.orbitDistance;
    }
  }

  updateLocalMatrix() {
    if (this.parentNode) {
      this.updateLocalMatrixFromParent();
    }

    const plusPress = this.keysPressed.SHIFT && this.keysPressed.EQUALS;
    const minusPress = this.keysPressed.SHIFT && this.keysPressed.MINUS;

    if (plusPress && this.isSelected) {
      this.orbitDistance += 0.01;
    } else if (minusPress && this.isSelected) {
      this.orbitDistance -= 0.01;
    }
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

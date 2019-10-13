'use strict';

import matrixHelpers from '../../helpers/matrixHelpers.js';
import GameNode from './GameNode.js';

export default class SystemObject extends GameNode {
  constructor() {
    super(null, false);

    this.orbitPathObject = null;
    this.orbitDistance = 0.75;
    this.orbitRate = 0;

    this.centerPlanet = null;
    this.centerPlanetSize = null;
  }

  addParentObject(object) {
    this.localMatrix.translate(object.orbitDistance, 0, 0);
    super.addParentObject(object);
  }

  addCenterObject(planet, centerPlanetSize) {
    this.centerPlanet = planet;
    this.centerPlanetSize = centerPlanetSize;
    planet.addParentObject(this);
  }

  addOrbitPath(pathObject, orbitDistance, orbitRate) {
    if (orbitDistance) this.orbitDistance = orbitDistance;
    if (orbitRate) this.orbitRate = orbitRate;
    this.orbitPathObject = pathObject;
    pathObject.addParentObject(this);
  }

  updateLocalMatrix() {
    if (this.parentNode) {
      matrixHelpers.rotatePerSecond(this.localMatrix, this.parentNode.orbitRate);
    }
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

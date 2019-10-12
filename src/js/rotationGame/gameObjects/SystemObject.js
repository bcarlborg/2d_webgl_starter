'use strict';

import wglm from '../../helpers/WebGLMath.js';
import matrixHelpers from '../../helpers/matrixHelpers.js';

export default class SystemObject {
  constructor() {
    this.parentNode = null;

    this.worldMatrix = (new wglm.Mat4()).set();
    this.localMatrix = (new wglm.Mat4()).set();

    this.orbitPathObject = null;
    this.orbitDistance = 0.75;
    this.orbitRate = 0;

    this.centerPlanet = null;
    this.centerPlanetSize = null;
  }

  addParentObject(object) {
    this.parentNode = object;
    this.localMatrix.translate(this.parentNode.orbitDistance, 0, 0);
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

  updateWorldMatrix() {
    this.worldMatrix.set();
    if (this.parentNode) {
      this.worldMatrix.mul(this.localMatrix);
      this.worldMatrix.mul(this.parentNode.worldMatrix);
    } else {
      this.worldMatrix.mul(this.localMatrix);
    }
  }

  update() {
    this.updateLocalMatrix();
    this.updateWorldMatrix();
  }
}

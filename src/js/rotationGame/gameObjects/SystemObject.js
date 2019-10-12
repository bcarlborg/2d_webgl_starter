'use strict';

import wglm from '../../helpers/WebGLMath.js';

export default class SystemObject {
  constructor() {
    this.parentNode = null;

    this.worldMatrix = (new wglm.Mat4()).set();
    this.localMatrix = (new wglm.Mat4()).set();

    this.orbitDistance = 0.75;

    this.centerPlanet = null;
    this.orbitPathObject = null;
  }

  addParentObject(object) {
    this.parentNode = object;
    this.localMatrix.translate(this.parentNode.orbitDistance, 0, 0);
  }

  addCenterObject(planet) {
    this.centerPlanet = planet;
  }

  addOrbitPath(pathObject, orbitDistance) {
    if (orbitDistance) this.orbitDistance = orbitDistance;
    this.orbitPathObject = pathObject;
  }

  updateLocalMatrix() {
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

'use strict';

import wglm from '../../helpers/WebGLMath.js';

export default class SystemObject {
  constructor() {
    this.parentNode = null;

    this.worldMatrix = (new wglm.Mat4()).set();
    this.localMatrix = (new wglm.Mat4()).set();

    this.orbitDistance = 1.0;

    this.centerPlanet = null;
    this.orbitPathObject = null;
  }

  addParentObject(object) {
    this.parentNode = object;
  }

  addCenterObject(planet) {
    this.centerPlanet = planet;
  }

  updateLocalMatrix() {
    // for now I just want all systems to start at the origin
    this.localMatrix.set();
  }

  updateWorldMatrix() {
    if (this.parentNode) {
      const parentWorldMatrix = this.parentNode.worldMatrix;
      this.worldMatrix = parentWorldMatrix.mul(this.localMatrix);
    } else {
      this.worldMatrix = this.localMatrix;
    }
  }

  update() {
    this.updateLocalMatrix();
    this.updateWorldMatrix();
  }
}

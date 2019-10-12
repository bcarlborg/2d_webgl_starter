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
  }

  addCenterObject(planet) {
    this.centerPlanet = planet;
  }

  addOrbitPath(pathObject) {
    this.orbitPathObject = pathObject;
  }

  updateLocalMatrix() {
    // for now I just want all systems to start at the origin
    this.localMatrix.set();
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

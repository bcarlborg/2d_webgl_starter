'use strict';

import wglm from '../../helpers/WebGLMath.js';
import GameObject from '../../GameObject.js';

export default class PlanetObject extends GameObject {
  constructor(mesh) {
    super(mesh);

    this.parentNode = null;

    this.worldMatrix = (new wglm.Mat4()).set();
    this.localMatrix = (new wglm.Mat4()).set();

    this.initLocalMatrix();
  }

  initLocalMatrix() {
    this.localMatrix.scale(0.1);
    this.localMatrix.translate(0.0, 0.0, 0);
  }

  addParentObject(object) {
    this.parentNode = object;
  }

  updateLocalMatrix() {
    // at least for now... we don't really want the
    // planets to actually do anything.
    // this.rotateByRate(this.localMatrix, 2, 1);
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
    this.modelMatrix.set();
    this.updateLocalMatrix();
    this.updateWorldMatrix();
    this.modelMatrix.mul(this.worldMatrix);
  }
}

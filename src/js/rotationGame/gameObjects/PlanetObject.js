'use strict';

import wglm from '../../helpers/WebGLMath.js';
import GameObject from '../../GameObject.js';

export default class PlanetObject extends GameObject {
  constructor(mesh) {
    super(mesh);

    this.parentNode = null;

    this.worldMatrix = (new wglm.Mat4()).set();
    this.localMatrix = (new wglm.Mat4()).set();
  }

  addParentObject(object) {
    this.parentNode = object;
  }

  updateLocalMatrix() {
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
    this.modelMatrix.set();
    this.updateLocalMatrix();
    this.updateWorldMatrix();
    this.modelMatrix.mul(this.worldMatrix);
  }
}

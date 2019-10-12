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
    this.modelMatrix.set();
    this.updateLocalMatrix();
    this.updateWorldMatrix();
    this.modelMatrix.mul(this.worldMatrix);
  }
}

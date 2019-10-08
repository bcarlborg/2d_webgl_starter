'use strict';

import wglm from './helpers/WebGLMath.js';

/* exported GameObject */
export default class GameObject extends wglm.UniformProvider {
  constructor(mesh, timeObject) {
    super('gameObject', 'gameObject2');
    this.timeObject = timeObject;
    this.addComponentsAndGatherUniforms(mesh); // defines this.modelMatrix
    this.modelMatrix.set();
  }

  translate(x, y, z) {
    this.modelMatrix.translate(x, y, z);
  }

  rotate(radians) {
    this.modelMatrix.rotate(radians);
  }

  scale(amplitude) {
    this.modelMatrix.scale(amplitude);
  }

  update() {
    this.modelMatrix.set();
    this.scale(this.scale);
    this.rotate(this.timeObject.t);
    this.translate(0, 0, 0);
  }
}

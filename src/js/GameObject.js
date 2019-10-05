'use strict';

import wglm from './helpers/WebGLMath.js';

/* exported GameObject */
export default class GameObject extends wglm.UniformProvider {
  constructor(mesh) {
    super('gameObject', 'gameObject2');

    this.position = new wglm.Vec3(0, 0, 0);
    this.orientation = 0;
    this.scale = new wglm.Vec3(1.0, 1.0, 1.0);
    this.currStripeWidth = 0;
    this.addComponentsAndGatherUniforms(mesh); // defines this.modelMatrix
    this.modelMatrix.set();
  }

  update(dt, t) {
    this.modelMatrix.set();
    this.modelMatrix.scale(this.scale);
    this.orientation += dt;
    this.modelMatrix.rotate(this.orientation);
    this.modelMatrix.translate(this.position);
  }
}

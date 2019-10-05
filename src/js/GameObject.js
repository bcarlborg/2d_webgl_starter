'use strict';

import wglm from './helpers/WebGLMath.js';

/* exported GameObject */
export default class GameObject extends wglm.UniformProvider {
  constructor(mesh) {
    super('gameObject', 'gameObject2');

    this.position = new wglm.Vec3(0, 0, 0);
    this.orientation = 0;
    this.scale = new wglm.Vec3(0.6, 0.6, 0.6);
    this.currStripeWidth = 0;
    this.addComponentsAndGatherUniforms(mesh); // defines this.modelMatrix
    this.stripeWidth.set(0.2, 0);
    this.modelMatrix.set();
  }

  update(dt, t) {
    this.modelMatrix.set();
    this.modelMatrix.scale(this.scale);
    this.orientation += dt;
    this.modelMatrix.rotate(this.orientation);
    this.modelMatrix.translate(this.position);

    this.currStripeWidth = 0.75 * Math.sin(t * 2) + 1;
    this.stripeWidth.set(this.currStripeWidth, 0);
  }
}

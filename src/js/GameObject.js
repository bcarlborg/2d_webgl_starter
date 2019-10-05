'use strict';

import wglm from './helpers/WebGLMath.js';

/* exported GameObject */
export default class GameObject extends wglm.UniformProvider {
  constructor(mesh) {
    super('gameObject', 'gameObject2');

    this.position = new wglm.Vec3(0, 0, 0);
    this.orientation = 0;
    this.scale = new wglm.Vec3(0.3, 0.3, 0.3);
    this.addComponentsAndGatherUniforms(mesh); // defines this.modelMatrix
    this.stripeWidth.set(0.2, 0);
    this.modelMatrix.set();
  }

  // PRACTICAL TODO: update method setting up this.modelMatrix
  update(dt) {
    // strip width
    this.modelMatrix.set();
    this.modelMatrix.scale(this.scale);
    this.orientation += dt;
    this.modelMatrix.rotate(this.orientation);
    this.modelMatrix.translate(this.position);

    this.currStripeWidth += dt;
    // this.stripeWidth.set(Math.sin(1.5 * this.currStripeWidth) + 1.5);
    // this.stipeWidth.set(new Number(0.2));
  }
}

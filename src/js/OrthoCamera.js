'use strict';

import wglm from './helpers/WebGLMath.js';

export default class OrthoCamera extends wglm.UniformProvider {
  constructor(...programs) {
    super('camera');
    this.position = new wglm.Vec2(0.0, 0);
    this.rotation = 0;
    this.windowSize = new wglm.Vec2(2, 2);

    this.addComponentsAndGatherUniforms(...programs[0]);
  }

  update(t) {
    // this.position.add(0.01 * Math.sin(t), 0);
    this.viewProjMatrix
      .set()
      .scale(this.windowSize)
      .rotate(this.rotation)
      .translate(this.position)
      .invert();
  }

  setAspectRatio(ar) {
    this.windowSize.x = this.windowSize.y * ar;
    this.update();
  }
}

'use strict';

import wglm from './helpers/WebGLMath.js';
import GameTime from './GameTime.js';

/* exported GameObject */
export default class GameObject extends wglm.UniformProvider {
  constructor(mesh) {
    super('gameObject');
    this.addComponentsAndGatherUniforms(mesh);
    this.modelMatrix.set();
    this.gameTime = new GameTime();
  }

  rotateByRate(matrix, radians, seconds) {
    const radiansPerSecond = radians / seconds;
    const radianDelta = radiansPerSecond * this.gameTime.dtSeconds;
    matrix.rotate(radianDelta);
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
  }
}

'use strict';

import wglm from '../../helpers/WebGLMath.js';

export default class GenericObject extends wglm.UniformProvider {
  constructor(mesh) {
    super('gameObject');
    this.addComponentsAndGatherUniforms(mesh);
  }

  update() {}
}

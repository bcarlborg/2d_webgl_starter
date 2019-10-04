'use strict';


import wglm from './helpers/WebGLMath.js';

export default class Material extends wglm.UniformProvider {
  constructor(gl, program) {
    super('material');
    this.addComponentsAndGatherUniforms(program);
    return onlyWarnOnMissingPropertyAccess(this);
  }
}

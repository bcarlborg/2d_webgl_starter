'use strict';

import wglm from '../helpers/WebGLMath.js';

export default class Mesh extends wglm.UniformProvider {
  constructor(material, geometry) {
    super('mesh');
    this.addComponentsAndGatherUniforms(material, geometry);
  }
}

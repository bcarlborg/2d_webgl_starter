'use strict';

/* exported Material */
export default class Material extends UniformProvider {
  constructor(gl, program) {
    super('material');
    this.addComponentsAndGatherUniforms(program);
    return onlyWarnOnMissingPropertyAccess(this);
  }
}

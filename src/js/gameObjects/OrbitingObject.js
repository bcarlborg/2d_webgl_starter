'use strict';

import wglm from '../helpers/WebGLMath.js';

export default class OrbitingObject extends wglm.UniformProvider {
  constructor(mesh) {
    super('gameObject');
    this.addComponentsAndGatherUniforms(mesh);

    this.centerRotationPoint = new wglm.Vec4();
    this.rotationRadius = 1.0;
    this.translation = new wglm.Vec3();

    this.modelMatrix.set();
  }

  update(timeObject) {
    const angle = timeObject.t;
    this.modelMatrix.set();

    const xTranslation = this.rotationRadius * Math.cos(angle);
    const yTranslation = this.rotationRadius * Math.sin(angle);
    this.translation.set(xTranslation, yTranslation, 0.0);

    this.modelMatrix.translate(this.translation);
  }
}

'use strict';

import ForceGenerator from './ForceGenerator.js';
import wglm from '../../helpers/WebGLMath.js';

export default class BlackHole extends ForceGenerator {
  constructor(mesh) {
    super(mesh);
    this.strength = 10;
  }

  calculateForce(positionVec) {
    const pointInfo = this.infoBetweenPoints(positionVec);
    const angledX = Math.cos(pointInfo.angle);
    const angledY = Math.sin(pointInfo.angle);
    console.log(pointInfo.angle);
    return new wglm.Vec3(angledX, angledY, 0);
  }
}

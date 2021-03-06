'use strict';

import ForceGenerator from './ForceGenerator.js';
import wglm from '../../helpers/WebGLMath.js';

export default class BlackHole extends ForceGenerator {
  constructor(mesh) {
    super(mesh);
    this.strength = 5;
  }

  calculateForce(positionVec) {
    const pointInfo = this.infoBetweenPoints(positionVec);
    const angledX = Math.cos(pointInfo.angle);
    const angledY = Math.sin(pointInfo.angle);
    const forceX = (angledX * this.strength) / (pointInfo.distance / 10);
    const forceY = (angledY * this.strength) / (pointInfo.distance / 10);
    return new wglm.Vec3(forceX, forceY, 0);
  }
}

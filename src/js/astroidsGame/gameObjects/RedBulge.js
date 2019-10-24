'use strict';

import ForceGenerator from './ForceGenerator.js';
import wglm from '../../helpers/WebGLMath.js';

export default class RedBulge extends ForceGenerator {
  constructor(mesh) {
    super(mesh);
    this.strength = 2;
  }

  calculateForce(positionVec) {
    const pointInfo = this.infoBetweenPoints(positionVec);
    const angledX = Math.cos(pointInfo.angle + Math.PI);
    const angledY = Math.sin(pointInfo.angle + Math.PI);
    const forceX = (angledX * this.strength) / (pointInfo.distance / 10);
    const forceY = (angledY * this.strength) / (pointInfo.distance / 10);
    return new wglm.Vec3(forceX, forceY, 0);
  }
}

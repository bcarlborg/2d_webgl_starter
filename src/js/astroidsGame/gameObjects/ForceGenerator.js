'use strict';

import GameNode from './GameNode.js';
import wglm from '../../helpers/WebGLMath.js';

export default class ForceGenerator extends GameNode {
  constructor(mesh) {
    super(mesh);
    this.collidable = false;
    this.position = new wglm.Vec3(0, 0, 0);
    this.scale = 1;
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
  }

  setScale(factor) {
    this.scale = factor;
  }

  infoBetweenPoints(positionVec) {
    const x1 = this.position.x;
    const y1 = this.position.y;
    const x2 = positionVec.x;
    const y2 = positionVec.y;

    const dxSqr = (x2 - x1) ** 2;
    const dySqr = (y2 - y1) ** 2;
    const angle = Math.atan2(y1 - y2, x1 - x2);
    const distance = Math.sqrt(dxSqr + dySqr);
    return { angle, distance };
  }

  calculateForce() {
    return new wglm.Vec3(0, 0, 0);
  }

  update() {
    this.localMatrix
      .set()
      .scale(this.scale)
      .translate(this.position);
    super.update();
  }
}

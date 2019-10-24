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

  calculateForce(positionVec) {
    return new wglm.Vec3(1, 1, 0);
  }

  update() {
    this.localMatrix
      .set()
      .scale(this.scale)
      .translate(this.position);
    super.update();
  }
}

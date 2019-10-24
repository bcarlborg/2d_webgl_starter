'use strict';

import GameNode from './GameNode.js';
import wglm from '../../helpers/WebGLMath.js';

export default class ForceGenerator extends GameNode {
  constructor(mesh) {
    super(mesh);
    this.position = wglm.Vec3(0, 0, 0);
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
  }

  calculateForce(positionVec) {
    return wglm.Vec3(1, 1, 0);
  }

  update() {
    this.localMatrix
      .set()
      .translate(this.position);
    super.update();
  }
}

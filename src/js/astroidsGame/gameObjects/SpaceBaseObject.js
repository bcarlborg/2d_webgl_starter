'use strict';

import wglm from '../../helpers/WebGLMath.js';
import GameNode from './GameNode.js';

/* exported GameObject */
export default class SpaceBaseObject extends GameNode {
  constructor(mesh) {
    super(mesh);

    this.position = new wglm.Vec3(0, 0, 0);
    this.orientation = 0;
    this.scale = new wglm.Vec3(1, 1, 1);

    this.force = new wglm.Vec3();
    this.torque = 0.1;
    this.velocity = new wglm.Vec3();
    this.invMass = 0.9;
    this.backDrag = 1;
    this.sideDrag = 1;
    this.invAngularMass = 1;
    this.angularVelocity = 1;
    this.angularDrag = 1;
  }

  move() {}

  control() {}
}

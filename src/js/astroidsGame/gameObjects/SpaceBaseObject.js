'use strict';

import wglm from '../../helpers/WebGLMath.js';
import GameNode from './GameNode.js';

/* exported GameObject */
export default class SpaceBaseObject extends GameNode {
  constructor(mesh, collidable) {
    super(mesh);
    this.collidable = collidable;
    this.position = new wglm.Vec3(0, 0, 0);
    this.orientation = 0;
    this.scaleFactor = 1;
    this.scale = new wglm.Vec3(this.scaleFactor);

    this.force = new wglm.Vec3();
    this.torque = 0.1;
    this.velocity = new wglm.Vec3();
    this.invMass = 0.9;
    this.backDrag = 1;
    this.sideDrag = 1;
    this.invAngularMass = 1;
    this.angularVelocity = 0;
    this.angularDrag = 1;

    this.collisionCircleCenter = this.position;
    this.collisionCircleRadius = this.scaleFactor;
  }

  setVelocity(x, y, z) {
    this.velocity.set(x, y, z);
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
  }

  setLocalMatrix() {
    this.scale.set(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.localMatrix.set();
    this.localMatrix.rotate(this.orientation);
    this.localMatrix.scale(this.scale);
    this.localMatrix.translate(this.position);
  }

  update() {
    this.setLocalMatrix();
    super.update();
  }
}

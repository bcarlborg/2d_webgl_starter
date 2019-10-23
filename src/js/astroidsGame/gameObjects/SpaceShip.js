'use strict';

import wglm from '../../helpers/WebGLMath.js';
import SpaceBaseObject from './SpaceBaseObject.js';

export default class SpaceShip extends SpaceBaseObject {
  constructor(mesh) {
    super(mesh, true);
    this.thrustForce = 10;
    this.leftTorque = 1;
    this.rightTorque = -1;

    this.drag = 0.995;
    this.angularDrag = 0.99;
  }

  update() {
    this.control();
    super.update();
  }

  control() {
    const dtSec = this.gameTime.dt / 1000;

    const acceleration = new wglm.Vec3();
    if (this.keysPressed.UP) {
      const adjustedAngle = this.orientation + Math.PI / 2;
      const directionalForce = new wglm.Vec3(
        this.thrustForce * Math.cos(adjustedAngle),
        this.thrustForce * Math.sin(adjustedAngle),
        0.0,
      );
      acceleration.set(directionalForce).mul(this.invMass);
    }
    this.velocity.addScaled(dtSec, acceleration);
    this.velocity.mul(this.drag);
    this.position.addScaled(dtSec, this.velocity);

    let angularAcceleration = 0;
    if (this.keysPressed.LEFT) {
      angularAcceleration = this.leftTorque * this.invAngularMass;
    }
    if (this.keysPressed.RIGHT) {
      angularAcceleration = this.rightTorque * this.invAngularMass;
    }
    this.angularVelocity += angularAcceleration * dtSec;
    this.angularVelocity *= this.angularDrag;
    this.orientation += this.angularVelocity * dtSec;
  }
}

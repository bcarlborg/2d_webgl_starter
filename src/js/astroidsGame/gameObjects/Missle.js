'use strict';

import SpaceBaseObject from './SpaceBaseObject.js';
import wglm from '../../helpers/WebGLMath.js';

export default class Missle extends SpaceBaseObject {
  constructor(mesh, orientation, position, forceGenerators) {
    super(mesh, true, forceGenerators);
    this.orientation = orientation;
    const scalarVelocity = 15;
    const velocityAdjustedOrientation = this.orientation + Math.PI / 2;
    this.scaleFactor = 0.25;
    const adjustedX = Math.cos(velocityAdjustedOrientation);
    const adjustedY = Math.sin(velocityAdjustedOrientation);

    this.velocity = new wglm.Vec3(
      scalarVelocity * adjustedX,
      scalarVelocity * adjustedY,
      0.0,
    );

    this.position.set(position.x + 2 * adjustedX, position.y + 2 * adjustedY, 0);
  }

  move() {
    const dtSec = this.gameTime.dt / 1000;
    this.position.addScaled(dtSec, this.velocity);
    this.orientation += this.angularVelocity;
  }

  collideFunc() {
    console.log('missle collided with something!');
  }

  update() {
    this.move();
    super.update();
  }
}

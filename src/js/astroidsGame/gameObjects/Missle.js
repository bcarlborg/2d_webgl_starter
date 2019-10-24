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
    this.velocity = new wglm.Vec3(
      scalarVelocity * Math.cos(velocityAdjustedOrientation),
      scalarVelocity * Math.sin(velocityAdjustedOrientation),
      0.0,
    );

    this.position.set(position.x, position.y, 0);
    this.angularVelocity = Math.random() * 0.01;
  }

  move() {
    const dtSec = this.gameTime.dt / 1000;
    this.position.addScaled(dtSec, this.velocity);
    this.orientation += this.angularVelocity;
  }

  update() {
    this.move();
    super.update();
  }
}

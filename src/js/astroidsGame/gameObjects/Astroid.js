import wglm from '../../helpers/WebGLMath.js';
import SpaceBaseObject from './SpaceBaseObject.js';

export default class Astroid extends SpaceBaseObject {
  constructor(mesh) {
    super(mesh, true);
    this.orientation = Math.random() * 2 * Math.PI;
    const scalarVelocity = Math.random() * 2;
    const velocityAdjustedOrientation = this.orientation + Math.PI / 2;
    this.velocity = new wglm.Vec3(
      scalarVelocity * Math.cos(velocityAdjustedOrientation),
      scalarVelocity * Math.sin(velocityAdjustedOrientation),
      0.0,
    );

    this.position.set(5, 5, 0);

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

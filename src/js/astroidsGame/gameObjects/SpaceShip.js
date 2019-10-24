'use strict';

import wglm from '../../helpers/WebGLMath.js';
import SpaceBaseObject from './SpaceBaseObject.js';
import OverlayHandler from '../OverlayHandler.js';

export default class SpaceShip extends SpaceBaseObject {
  constructor(mesh, thrusters, forceGenerators, buildMissle) {
    super(mesh, true, forceGenerators);
    this.buildMissle = buildMissle;
    this.thrusterObjects = {
      left: thrusters[0],
      bottom: thrusters[1],
      right: thrusters[2],
    };
    this.thrusterOn = {
      left: false,
      bottom: false,
      right: false,
    };

    this.initializeThrusters();

    this.overlayHandler = new OverlayHandler();
    this.ammoLoadingPercent = 0;

    this.thrustForce = 10;
    this.leftTorque = 1;
    this.rightTorque = -1;

    this.drag = 0.995;
    this.angularDrag = 0.99;
  }

  initializeThrusters() {
    this.thrusterObjects.left.addParentObject(this);
    this.thrusterObjects.left
      .translateRotateAndScale(-1.0, -0.8, 0, Math.PI * (2.5 / 4), 0.75);

    this.thrusterObjects.right.addParentObject(this);
    this.thrusterObjects.right
      .translateRotateAndScale(1.0, -0.8, 0, Math.PI * (-2.5 / 4), 0.75);

    this.thrusterObjects.bottom.addParentObject(this);
    this.thrusterObjects.bottom
      .translateRotateAndScale(0, -1.6, 0, Math.PI, 1.0);
  }

  updateAmmoPercent() {
    if (this.ammoLoadingPercent >= 100) {
      this.ammoLoadingPercent = 100;
      this.overlayHandler.setAmmoText('[MISSLE STATUS]: 100% READY TO FIRE');
      this.mayFire = true;
    } else {
      this.mayFire = false;
      this.ammoLoadingPercent += 20.0 * (this.gameTime.dt / 1000);
      this.overlayHandler.setAmmoText(`[MISSLE STATUS]: ${Math.floor(this.ammoLoadingPercent)}% LOADING...`);
    }
  }

  update() {
    this.control();
    this.updateAmmoPercent();
    this.thrusterObjects.left.update();
    this.thrusterObjects.right.update();
    this.thrusterObjects.bottom.update();
    super.update();
  }

  draw() {
    if (this.thrusterOn.left) this.thrusterObjects.left.draw();
    if (this.thrusterOn.right) this.thrusterObjects.right.draw();
    if (this.thrusterOn.bottom) this.thrusterObjects.bottom.draw();
    super.draw();
  }

  control() {
    const dtSec = this.gameTime.dt / 1000;
    this.thrusterOn.left = false;
    this.thrusterOn.right = false;
    this.thrusterOn.bottom = false;

    const adjustedAngle = this.orientation + Math.PI / 2;
    const angleAdjustedX = Math.cos(adjustedAngle);
    const angleAdjustedY = Math.sin(adjustedAngle);

    if (this.keysPressed.UP) {
      this.thrusterOn.bottom = true;
      const directionalForce = new wglm.Vec3(
        this.thrustForce * angleAdjustedX,
        this.thrustForce * angleAdjustedY,
        0.0,
      );
      this.updatePositionWithVelocity(directionalForce);
    } else {
      this.updatePositionWithVelocity();
    }

    if (this.keysPressed.SPACE && this.mayFire) {
      this.buildMissle(this.orientation, this.position);
      this.ammoLoadingPercent = 0;
    }

    let angularAcceleration = 0;
    if (this.keysPressed.LEFT) {
      this.thrusterOn.right = true;
      angularAcceleration = this.leftTorque * this.invAngularMass;
    }
    if (this.keysPressed.RIGHT) {
      this.thrusterOn.left = true;
      angularAcceleration = this.rightTorque * this.invAngularMass;
    }
    this.angularVelocity += angularAcceleration * dtSec;
    this.angularVelocity *= this.angularDrag;
    this.orientation += this.angularVelocity * dtSec;
  }
}

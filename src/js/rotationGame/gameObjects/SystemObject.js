'use strict';

import matrixHelpers from '../../helpers/matrixHelpers.js';
import GameNode from './GameNode.js';

export default class SystemObject extends GameNode {
  constructor() {
    super(null, false);

    this.orbitPathObject = null;
    this.orbitDistance = 0.75;
    this.parentOrbitDistance = null;
    this.orbitRate = 0;

    this.children = [];
    this.childrenOrbitOffsets = [];
    this.orbitOffset = 0;

    this.centerPlanet = null;
    this.centerPlanetSize = null;
  }

  addParentSystem(system) {
    // translate ourselves using the orbit distance of parent system
    this.localMatrix.translate(system.orbitDistance, 0, 0);
    this.localMatrix.rotate(this.orbitOffset);
    this.parentOrbitDistance = system.orbitDistance;
    super.addParentObject(system);
  }

  setOrbitOffset(offset) {
    this.orbitOffset = offset;
  }

  addChildSystem(system) {
    this.children.push(system);
    const numberOfChildren = this.children.length;
    const offset = (Math.PI * 2) / numberOfChildren;
    this.children.forEach((child, i) => {
      child.setOrbitOffset(offset * i);
    });
    system.addParentSystem(this);
  }

  addCenterObject(planet, centerPlanetSize) {
    this.centerPlanet = planet;
    this.centerPlanetSize = centerPlanetSize;
    planet.addParentSystem(this);
  }

  addOrbitPath(pathObject, orbitDistance, orbitRate) {
    if (orbitDistance) this.orbitDistance = orbitDistance;
    if (orbitRate) this.orbitRate = orbitRate;
    this.orbitPathObject = pathObject;
    pathObject.addParentSystem(this);
  }

  updateLocalMatrixFromParent() {
    matrixHelpers.rotatePerSecond(this.localMatrix, this.parentNode.orbitRate);
    if (this.parentNode.orbitDistance !== this.parentOrbitDistance) {
      const orbitDiff = 1 + (this.parentNode.orbitDistance - this.parentOrbitDistance);
      this.localMatrix.scale(orbitDiff);
      this.parentOrbitDistance = this.parentNode.orbitDistance;
    }
  }

  updateByMovement() {
    const leftPress = this.keysPressed.LEFT;
    const rightPress = this.keysPressed.RIGHT;
    const upPress = this.keysPressed.UP;
    const downPress = this.keysPressed.DOWN;

    if (this.parentNode) {
      const rateDiff = this.parentNode
        ? this.parentNode.orbitRate + 0.05
        : 0.05;
      if (leftPress && this.isSelected) {
        this.localMatrix.rotate(rateDiff);
      } else if (rightPress && this.isSelected) {
        this.localMatrix.rotate(-1 * (rateDiff));
      }
    }
    if (!this.parentNode && this.isSelected) {
      if (leftPress) {
        this.localMatrix.translate(-0.01, 0.0, 0.0);
      }
      if (rightPress) {
        this.localMatrix.translate(0.01, 0.0, 0.0);
      }
      if (downPress) {
        this.localMatrix.translate(0.0, -0.01, 0.0);
      }
      if (upPress) {
        this.localMatrix.translate(0.0, 0.01, 0.0);
      }
    }
  }

  updateLocalMatrix() {
    if (this.parentNode) {
      this.updateLocalMatrixFromParent();
    }

    const plusPress = this.keysPressed.SHIFT && this.keysPressed.EQUALS;
    const minusPress = this.keysPressed.SHIFT && this.keysPressed.MINUS;

    if (plusPress && this.isSelected) {
      this.orbitDistance += 0.01;
    } else if (minusPress && this.isSelected) {
      this.orbitDistance -= 0.01;
    }

    this.updateByMovement();
  }

  update() {
    this.updateLocalMatrix();
    super.update();
  }
}

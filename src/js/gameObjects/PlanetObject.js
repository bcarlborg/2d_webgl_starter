'use strict';

import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';

export default class PlanetObject extends GameObject {
  constructor(mesh, timeObject) {
    super(mesh, timeObject);

    this.children = [];
    this.childrenOrbitAngles = [];
    this.myOrbitAngle = 0;
    this.myOrbitRadius = 0;
    this.myRotationSpeed = 1.0;
    this.myCenterOfOrbit = (new wglm.Vec3()).set();
    this.myLocation = (new wglm.Vec3()).set();
    this.myScale = 0.25;
  }

  // this function moves my orbit into the correct location
  orbit() {
    const angle = this.myOrbitAngle;
    const period = this.myRotationSpeed;
    const amplitude = this.myOrbitRadius;

    this.myLocation.x = amplitude * Math.cos(period * angle);
    this.myLocation.y = amplitude * Math.sin(period * angle);

    if (this.parentPlanet) {
      this.myLocation.x += this.myCenterOfOrbit.x;
      this.myLocation.y += this.myCenterOfOrbit.y;
    }

    this.translate(this.myLocation);
  }

  // Methods a parent uses
  addChild(childPlanet) {
    this.children.push(childPlanet);
    this.spaceChildrenOrbits();
  }

  spaceChildrenOrbits() {
    this.childrenOrbitAngles = [];
    const orbitAngles = this.childrenOrbitAngles;
    const numberOfChildren = this.children.length;
    const baseSpace = (2 * Math.PI) / numberOfChildren;

    for (let i = 0; i < numberOfChildren; i += 1) {
      orbitAngles.push(baseSpace * i);
    }
  }

  incrementChildrenOrbits(delta) {
    for (let i = 0; i < this.childrenOrbitAngles.length; i += 1) {
      this.childrenOrbitAngles[i] += delta;
    }
  }

  updateChildren() {
    this.incrementChildrenOrbits(0.01);
    this.children.forEach((child, i) => {
      child.setOrbitRadius(1);
      child.setOrbitAngle(this.childrenOrbitAngles[i]);
      child.setCenterOfOrbit(this.myLocation);
      child.update();
    });
  }

  // Methods for a parent
  setOrbitRadius(radius) {
    this.myOrbitRadius = radius;
  }

  setOrbitAngle(angle) {
    this.myOrbitAngle = angle;
  }

  setCenterOfOrbit(orbitLocation) {
    this.myCenterOfOrbit = orbitLocation;
  }

  draw() {
    super.draw();
    this.children.forEach((child) => child.draw());
  }

  update() {
    this.modelMatrix.set();
    this.scale(this.myScale);
    this.orbit();
    this.updateChildren();
  }
}

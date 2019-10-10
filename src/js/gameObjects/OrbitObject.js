'use strict';

import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';

export default class OrbitObject extends GameObject {
  constructor(mesh) {
    super(mesh);
    this.myOrbitRadius = 3.5;
    this.myScale = 1.0;
    this.myLocation = (new wglm.Vec3()).set();
  }

  orbit() {
    this.translate(this.myLocation);
  }

  setScale(scale) {
    this.myScale = scale;
  }

  setOrbitRadius(radius) {
    this.myOrbitRadius = radius;
  }

  setCenterOfOrbit(center) {
    this.myLocation.x = center.x;
    this.myLocation.y = center.y;
  }

  update() {
    this.modelMatrix.set();
    this.scale(this.myOrbitRadius);
    this.orbit();
  }
}

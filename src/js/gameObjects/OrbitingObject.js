'use strict';

// import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';

export default class OrbitingObject extends GameObject {
  constructor(mesh, timeObject) {
    super(mesh, timeObject);

    this.rotationRadius = 2.0;
  }

  orbit() {
    const angle = this.timeObject.t;
    const xTranslation = this.rotationRadius * Math.cos(angle);
    const yTranslation = this.rotationRadius * Math.sin(angle);
    this.translate(xTranslation, yTranslation, 0.0);
  }

  update() {
    this.modelMatrix.set();
    this.orbit();
    // this.modelMatrix.set();
    // this.scale(this.scale);
    // this.rotate(this.timeObject.t);
    // this.translate(0, 0, 0);
  }
}

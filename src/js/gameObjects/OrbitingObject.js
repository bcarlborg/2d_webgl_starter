'use strict';

// import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';

export default class OrbitingObject extends GameObject {
  constructor(mesh, timeObject) {
    super(mesh, timeObject);
    this.rotationRadius = 1.0;
  }

  orbit() {
    const angle = this.timeObject.t;
    const xTranslation = this.rotationRadius * Math.cos(angle);
    const yTranslation = this.rotationRadius * Math.sin(angle);
    this.translate(xTranslation, yTranslation, 0.0);
  }

  pulse() {
    const amplitude = 0.25;
    const offset = 0.5;
    const period = 3.0;
    const scale = amplitude * Math.sin(period * this.timeObject.t) + offset;
    this.scale(scale);
  }

  update() {
    this.modelMatrix.set();
    this.pulse();
    this.orbit();
  }
}

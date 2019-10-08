'use strict';

// import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';
import modulate from '../helpers/mathHelpers.js';

export default class OrbitingObject extends GameObject {
  constructor(mesh, timeObject) {
    super(mesh, timeObject);
    this.rotationRadius = 0.75;
  }

  orbit() {
    const angle = this.timeObject.t;
    const amplitude = this.rotationRadius;

    const x = amplitude * Math.cos(angle);
    const y = amplitude * Math.sin(angle);

    this.translate(x, y, 0.0);
  }

  pulse() {
    const scale = modulate(
      {
        amp: 0.1, offset: 0.15, period: 2.0, x: this.timeObject.t,
      },
    );
    this.scale(scale);
  }

  update() {
    this.modelMatrix.set();
    this.pulse();
    this.orbit();
  }
}

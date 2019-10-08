'use strict';

import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';
import modulate from '../helpers/mathHelpers.js';

export default class PlanetObject extends GameObject {
  constructor(mesh, timeObject, orbitPlanet) {
    super(mesh, timeObject);
    this.orbitPlanet = orbitPlanet;
    this.location = (new wglm.Vec3()).set();
    this.rotationRadius = 0.0;
    this.rotationSpeed = 1.0;
    this.scaleFactor = 0.25;
  }

  orbit() {
    const angle = this.timeObject.t;
    const amplitude = this.rotationRadius;
    const period = this.rotationSpeed;

    this.location.x = amplitude * Math.cos(period * angle);
    this.location.y = amplitude * Math.sin(period * angle);

    if (this.orbitPlanet) {
      this.location.x += this.orbitPlanet.location.x;
      this.location.y += this.orbitPlanet.location.y;
    }

    this.translate(this.location);
  }

  pulse() {
    const scale = modulate({
      amp: 0.1, offset: 0.15, period: 2.0, x: this.timeObject.t,
    });
    this.scale(scale);
  }

  update() {
    this.modelMatrix.set();
    this.scale(this.scaleFactor);
    // this.pulse();
    this.orbit();
  }
}

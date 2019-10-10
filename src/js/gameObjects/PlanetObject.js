'use strict';

import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';
import modulate from '../helpers/mathHelpers.js';

export default class PlanetObject extends GameObject {
  constructor(mesh, parentPlanet, orbitRadius, timeObject) {
    super(mesh, timeObject);
    this.parentPlanet = parentPlanet;
    this.location = (new wglm.Vec3()).set();
    this.orbitRadius = orbitRadius;
    this.rotationSpeed = 1.0;
    this.scaleFactor = 0.25;
  }

  orbit() {
    const angle = this.timeObject.t;
    const period = this.rotationSpeed;

    let amplitude = 0;
    if (this.parentPlanet) {
      amplitude = this.parentPlanet.getOrbitDistance();
    }

    this.location.x = amplitude * Math.cos(period * angle);
    this.location.y = amplitude * Math.sin(period * angle);

    if (this.parentPlanet) {
      this.location.x += this.parentPlanet.location.x;
      this.location.y += this.parentPlanet.location.y;
    }

    this.translate(this.location);
  }

  pulse() {
    const scale = modulate({
      amp: 0.1, offset: 0.15, period: 2.0, x: this.timeObject.t,
    });
    this.scale(scale);
  }

  getOrbitDistance() {
    return this.orbitRadius;
  }

  update() {
    this.modelMatrix.set();
    this.scale(this.scaleFactor);
    // this.pulse();
    this.orbit();
  }
}

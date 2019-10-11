'use strict';

import wglm from '../helpers/WebGLMath.js';
import GameObject from '../GameObject.js';

export default class PlanetObject extends GameObject {
  constructor(mesh) {
    super(mesh);
    this.orbitInformation = {
      centerOfOrbit: (new wglm.Vec3()).set(),
      orbitRadius: 2.0,
    };
    this.setRandomLocation();
  }

  setRandomLocation() {
    this.orbitInformation.centerOfOrbit.x = (Math.random() * 2 - 1) * 4;
    this.orbitInformation.centerOfOrbit.y = (Math.random() * 2 - 1) * 4;
  }

  addOrbitPath(orbit) {
    this.orbitInformation.addOrbitPathObject = orbit;
  }

  update() {
    const { orbitInformation } = this;
    this.modelMatrix.set();
    this.scale(0.15);
    this.translate(orbitInformation.centerOfOrbit);
  }
}

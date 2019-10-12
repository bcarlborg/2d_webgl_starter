'use strict';

import GameObject from '../../GameObject.js';

export default class OrbitPathObject extends GameObject {
  constructor(mesh, parentPlanet) {
    super(mesh);
    this.orbitInformation = parentPlanet.orbitInformation;
  }

  update() {
    const { orbitInformation } = this;
    this.modelMatrix.set();
    this.scale(orbitInformation.orbitRadius);
    this.translate(orbitInformation.centerOfOrbit);
  }
}

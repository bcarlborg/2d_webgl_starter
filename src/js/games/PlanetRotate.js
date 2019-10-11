'use strict';

import PlanetBuilder from './PlanetBuilder.js';

export default class PlanetRotate {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    this.planetBuilder = new PlanetBuilder(this.gl, materialBuilder);
    this.initializePlanets();
  }

  initializePlanets() {
    for (let i = 0; i < 4; i += 1) {
      const planetAndOrbit = this.planetBuilder.newPlanetWithOrbit();
      this.gameObjects.push(...planetAndOrbit);
    }
    console.log(this.gameObjects);
  }

  getGameObjectsForNextFrame() {
    return this.gameObjects;
  }
}

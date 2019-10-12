'use strict';

import SystemBuilder from './SystemBuilder.js';

export default class RotationGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    this.planetBuilder = new SystemBuilder(this.gl, materialBuilder);
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

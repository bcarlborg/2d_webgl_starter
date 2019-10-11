'use strict';

import PlanetBuilder from './PlanetBuilder.js';

export default class PlanetRotate {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    this.planetBuilder = new PlanetBuilder(this.gl, materialBuilder);
    this.initializePlanets();
    this.initializeOrbits();
  }

  initializePlanets() {
    for (let i = 0; i < 4; i += 1) {
      const planet = this.planetBuilder.newPlanet();
      this.gameObjects.push(planet);
    }
  }

  initializeOrbits() {
    for (let i = 0; i < 4; i += 1) {
      const orbit = this.planetBuilder.newOrbit();
      this.gameObjects.push(orbit);
    }
  }

  getGameObjectsForNextFrame() {
    return this.gameObjects;
  }
}

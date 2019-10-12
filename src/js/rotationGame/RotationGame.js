'use strict';

import SystemBuilder from './SystemBuilder.js';

export default class RotationGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = {
      drawable: [],
      updateable: [],
    };
    this.planetBuilder = new SystemBuilder(this.gl, materialBuilder);
    this.initializeSystem();
  }

  initializeSystem() {
    const newObjs = this.planetBuilder.newSystem();
    this.gameObjects.drawable.push(...newObjs.drawable);
    this.gameObjects.updateable.push(...newObjs.updateable);
  }

  drawableObjectsForNextFrame() {
    return this.gameObjects.drawable;
  }

  updateableObjectsForNexFrame() {
    return this.gameObjects.updateable;
  }
}

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
    const systemObjs = this.planetBuilder.newSystem(0.75);
    this.gameObjects.drawable.push(...systemObjs.drawable);
    this.gameObjects.updateable.push(...systemObjs.updateable);

    const system2Objs = this.planetBuilder.newSystem(0.3, systemObjs.system);
    this.gameObjects.drawable.push(...system2Objs.drawable);
    this.gameObjects.updateable.push(...system2Objs.updateable);
  }

  drawableObjectsForNextFrame() {
    return this.gameObjects.drawable;
  }

  updateableObjectsForNexFrame() {
    return this.gameObjects.updateable;
  }
}

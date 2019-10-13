'use strict';

import SystemBuilder from './SystemBuilder.js';
import ClickHandler from '../ClickHandler.js';

export default class RotationGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.clickHandler = new ClickHandler();

    this.gameObjects = {
      drawable: [],
      updateable: [],
      clickable: [],
    };
    this.planetBuilder = new SystemBuilder(this.gl, materialBuilder);
    this.initializeSystem();
  }

  initializeSystem() {
    const systemSizes = {
      orbitDistance: 0.75,
      orbitRate: 0.1,
      centerPlanetSize: 0.25,
    };
    const systemObjs = this.planetBuilder.newSystem(systemSizes);
    this.gameObjects.drawable.push(...systemObjs.drawable);
    this.gameObjects.updateable.push(...systemObjs.updateable);
    this.gameObjects.clickable.push(...systemObjs.clickable);

    const system2Sizes = {
      orbitDistance: 0.3,
      centerPlanetSize: 0.1,
    };
    const system2Objs = this.planetBuilder.newSystem(system2Sizes, systemObjs.system);
    this.gameObjects.drawable.push(...system2Objs.drawable);
    this.gameObjects.updateable.push(...system2Objs.updateable);
    this.gameObjects.clickable.push(...system2Objs.clickable);
    this.registerCLickableCallbacks();
  }

  registerCLickableCallbacks() {
    this.gameObjects.clickable.forEach((clickable) => {
      this.clickHandler.addEventCallback('onclick', (event) => {
        const wasClicked = clickable.boundingBox.doesPointIntersect(event.clickLoc);
        console.log(wasClicked);
      });
    });
  }

  drawableObjectsForNextFrame() {
    return this.gameObjects.drawable;
  }

  updateableObjectsForNexFrame() {
    return this.gameObjects.updateable;
  }
}

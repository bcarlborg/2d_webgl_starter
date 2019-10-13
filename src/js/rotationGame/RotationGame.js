'use strict';

import SystemBuilder from './SystemBuilder.js';
import ClickHandler from '../ClickHandler.js';

export default class RotationGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.clickHandler = new ClickHandler();

    this.gameObjects = [];
    this.selectedMaterial = materialBuilder.buildSolidMaterial('greenSea', '100');
    this.planetBuilder = new SystemBuilder(this.gl, materialBuilder);
    this.initializeSystem();
    this.registerCLickableCallbacks();
  }

  initializeSystem() {
    const grid = this.planetBuilder.newGridObject();
    this.gameObjects.push(grid);
    const systemSizes = {
      orbitDistance: 0.75,
      orbitRate: 0.1,
      centerPlanetSize: 0.25,
    };
    const systemObjs = this.planetBuilder.newSystem(systemSizes);
    this.gameObjects.push(...systemObjs.objs);

    const system2Sizes = {
      orbitDistance: 0.3,
      centerPlanetSize: 0.1,
    };
    const system2Objs = this.planetBuilder.newSystem(system2Sizes, systemObjs.system);
    this.gameObjects.push(...system2Objs.objs);
  }

  registerCLickableCallbacks() {
    this.gameObjects.forEach((obj) => {
      if (obj.clickable) {
        this.clickHandler.addEventCallback('onclick', (event) => {
          const wasClicked = obj.boundingBox.doesPointIntersect(event.clickLoc);
          if (wasClicked) obj.select();
        });
      }
    });
  }

  // will want another one of these specifically for adding one new object

  getAllObjects() {
    return this.gameObjects;
  }

  getSelectedMaterial() {
    return this.selectedMaterial;
  }

  drawableObjectsForNextFrame() {
    return this.gameObjects.drawable;
  }

  updateableObjectsForNexFrame() {
    return this.gameObjects.updateable;
  }
}

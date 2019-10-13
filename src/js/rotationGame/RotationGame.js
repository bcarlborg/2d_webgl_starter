'use strict';

import SystemBuilder from './SystemBuilder.js';
import ClickHandler from '../ClickHandler.js';
import KeyHandler from '../KeyHandler.js';

export default class RotationGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.clickHandler = new ClickHandler();
    this.keyHandler = new KeyHandler();

    this.keyHandler.registerClallback('N', this.onNKeyPress.bind(this));

    this.gameObjects = [];
    this.selectedMaterial = materialBuilder.buildRandomGridMaterial('900', '100');
    this.planetBuilder = new SystemBuilder(this.gl, materialBuilder);
    this.initializeSystem();
    this.registerCLickableCallbacks(this.gameObjects);
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

    const system3Objs = this.planetBuilder.newSystem(system2Sizes, systemObjs.system);
    this.gameObjects.push(...system3Objs.objs);
  }

  registerCLickableCallbacks(gameObjects) {
    gameObjects.forEach((obj) => {
      if (obj.clickable) {
        this.clickHandler.addEventCallback('onclick', (event) => {
          const wasClicked = obj.boundingBox.doesPointIntersect(event.clickLoc);
          if (wasClicked) obj.toggleSelect();
        });
      }
    });
  }

  onNKeyPress() {
    const systemSizes = {
      orbitDistance: 0.75,
      orbitRate: 0.1,
      centerPlanetSize: 0.25,
    };
    const newObjs = this.planetBuilder.newSystem(systemSizes);
    this.gameObjects.push(...newObjs.objs);
    this.registerCLickableCallbacks(newObjs.objs);
  }

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

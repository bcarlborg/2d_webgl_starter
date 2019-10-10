'use strict';

import PlanentBuilder from './PlanetBuilder.js';
import DragObject from '../gameObjects/DragObject.js';

export default class PlanetRotate {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    this.initTimeObject();
    this.planentBuilder = new PlanentBuilder(this.gl, this.timeObject, materialBuilder);
    // this.initializeGrid();
    this.initializePlanets();
  }

  initializePlanets() {
    const centerObject = this.planentBuilder.newPlanet();
    this.gameObjects.push(centerObject);

    const orbitingObject = this.planentBuilder.newPlanet(centerObject);
    this.gameObjects.push(orbitingObject);
  }

  initializeGrid() {
    const grid = new DragObject(this.gridIdleMesh, this.timeObject);
    this.gameObjects.push(grid);
  }


  initTimeObject() {
    this.timeAtFirstFrame = new Date().getTime();
    this.timeAtLastFrame = this.timeAtFirstFrame;
    const timeAtThisFrame = new Date().getTime();
    const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
    const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;
    this.timeAtLastFrame = timeAtThisFrame;
    this.timeObject = { dt, t };
  }

  updateTimeObject() {
    const timeAtThisFrame = new Date().getTime();
    const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
    const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;
    this.timeObject.dt = dt;
    this.timeObject.t = t;
  }

  getGameObjectsForNextFrame() {
    return this.gameObjects;
  }

  update() {
    this.updateTimeObject();
  }
}

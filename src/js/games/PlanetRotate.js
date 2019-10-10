'use strict';

import PlanetBuilder from './PlanetBuilder.js';
import DragObject from '../gameObjects/DragObject.js';

export default class PlanetRotate {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    this.initTimeObject();
    this.planetBuilder = new PlanetBuilder(this.gl, this.timeObject, materialBuilder);
    // this.initializeGrid();
    this.initializePlanets();
    this.createManyPlanets(this.gameObjects[0], 3);
  }

  initializePlanets() {
    const centerObject = this.planetBuilder.newPlanet();
    this.gameObjects.push(centerObject);

    // const orbitingObject1 = this.planetBuilder.newPlanet();
    // const orbitingObject2 = this.planetBuilder.newPlanet();
    // const orbitingObject3 = this.planetBuilder.newPlanet();
    // const orbitingObject4 = this.planetBuilder.newPlanet();
    // centerObject.addChild(orbitingObject1);
    // orbitingObject1.addChild(orbitingObject2);
    // centerObject.addChild(orbitingObject3);
    // centerObject.addChild(orbitingObject4);
    // console.log(orbitingObject1);
  }

  createManyPlanets(root, numberOfPlanets) {
    if (numberOfPlanets === 0) {
      return;
    }
    const fewerPlanets = numberOfPlanets - 1;
    const newPlanet1 = this.planetBuilder.newPlanet();
    // const newPlanet2 = this.planetBuilder.newPlanet();
    root.addChild(newPlanet1);
    // root.addChild(newPlanet2);
    this.createManyPlanets(newPlanet1, fewerPlanets);
    // this.createManyPlanets(newPlanet2, fewerPlanets);
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

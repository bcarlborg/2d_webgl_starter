'use strict';

import QuadGeometry from '../QuadGeometry.js';
import PlanetObject from '../gameObjects/PlanetObject.js';
import DragObject from '../gameObjects/DragObject.js';
import Mesh from '../Mesh.js';

export default class PlanetRotate {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    this.initTimeObject();
    this.initMaterials(materialBuilder);
    this.initializePlanets();
    this.initializeGrid();
  }

  initializeGrid() {
    const grid = new DragObject(this.gridIdleMesh, this.timeObject);
    this.gameObjects.push(grid);
  }

  initializePlanets() {
    this.centerObject = new PlanetObject(this.stripedIdleQuadMesh, this.timeObject);
    this.centerObject.rotationRadius = 0.0;

    this.firstOrbitingObject = new PlanetObject(
      this.stripedIdleQuadMesh, this.timeObject, this.centerObject,
    );
    this.firstOrbitingObject.rotationRadius = 1.50;
    this.firstOrbitingObject.scaleFactor = 0.15;
    this.firstOrbitingObject.rotationSpeed = 0.7;

    this.secondOrbitingObject = new PlanetObject(
      this.stripedIdleQuadMesh, this.timeObject, this.firstOrbitingObject,
    );
    this.secondOrbitingObject.rotationRadius = 0.70;
    this.secondOrbitingObject.scaleFactor = 0.05;
    this.secondOrbitingObject.rotationSpeed = 2.0;

    this.gameObjects.push(this.centerObject, this.firstOrbitingObject, this.secondOrbitingObject);
  }

  initMaterials(materialBuilder) {
    this.quadGeometry = new QuadGeometry(this.gl);

    materialBuilder.buildSolidMaterial();
    this.stripedIdleQuadMesh = new Mesh(
      materialBuilder.materials.solidMaterial,
      this.quadGeometry,
    );

    materialBuilder.buildGridMaterial();
    this.gridIdleMesh = new Mesh(
      materialBuilder.materials.gridMaterial,
      this.quadGeometry,
    );
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

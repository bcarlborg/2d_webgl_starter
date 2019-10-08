'use strict';

import TriangleGeometry from '../TriangleGeometry.js';
import QuadGeometry from '../QuadGeometry.js';
import OrbitingObject from '../gameObjects/OrbitingObject.js';
import Mesh from '../Mesh.js';

export default class PlanetRotate {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    materialBuilder.buildStripedMaterial();

    this.initTimeObject();

    this.triangleGeometry = new TriangleGeometry(this.gl);
    this.quadGeometry = new QuadGeometry(this.gl);

    this.stripedIdleQuadMesh = new Mesh(
      materialBuilder.materials.stripedMaterial,
      this.quadGeometry,
    );

    this.orbitingObject = new OrbitingObject(this.stripedIdleQuadMesh, this.timeObject);
    this.gameObjects.push(this.orbitingObject);
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

'use strict';

import TriangleGeometry from '../TriangleGeometry.js';
import QuadGeometry from '../QuadGeometry.js';
import GameObject from '../GameObject.js';
import OrbitingObject from '../gameObjects/OrbitingObject.js';
import Mesh from '../Mesh.js';

export default class PlanetRotate {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.gameObjects = [];
    materialBuilder.buildStripedMaterial();

    // initialize goemetries
    this.triangleGeometry = new TriangleGeometry(this.gl);
    this.quadGeometry = new QuadGeometry(this.gl);

    // initialize meshes
    this.stripedIdleQuadMesh = new Mesh(
      // this.narrowStripedIdleMaterial,
      materialBuilder.materials.stripedMaterial,
      this.quadGeometry,
    );

    this.gameObjects.push(this.testGameObject = new GameObject(this.stripedIdleQuadMesh));
    this.gameObjects.push(this.OrbitingObject = new OrbitingObject(this.stripedIdleQuadMesh));
  }

  getGameObjectsForNextFrame() {
    return this.gameObjects;
  }

  update() {
    // console.log(this.foobar);
  }
}

'use strict';

// import MaterialBuilder from '../materials/MaterialBuilder.js';
// import QuadGeometry from '../geometries/QuadGeometry.js';
import CircleGeomety from '../geometries/CircleGeometry.js';
import OrbitObject from '../gameObjects/OrbitObject.js';
import DonutGeometry from '../geometries/DonutGeometry.js';
import PlanetObject from '../gameObjects/PlanetObject.js';
import Mesh from '../Mesh.js';

export default class PlanetBuilder {
  constructor(gl, timeObject, materialBuilder) {
    this.gl = gl;
    this.timeObject = timeObject;
    // this.materialBuilder = new MaterialBuilder(this.gl);
    this.materialBuilder = materialBuilder;
  }

  newPlanet() {
    const geometry = new CircleGeomety(this.gl);
    const solidMaterial = this.materialBuilder.buildSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const planet = new PlanetObject(mesh, this.timeObject);

    const orbitGeometry = new DonutGeometry(this.gl);
    const orbitMesh = new Mesh(orbitGeometry, solidMaterial);
    const orbitPath = new OrbitObject(orbitMesh);
    planet.addOrbitPath(orbitPath);

    return planet;
  }
}

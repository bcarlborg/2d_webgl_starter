'use strict';

// import MaterialBuilder from '../materials/MaterialBuilder.js';
import Mesh from '../Mesh.js';
import CircleGeomety from '../geometries/CircleGeometry.js';
import DonutGeometry from '../geometries/DonutGeometry.js';

import PlanetObject from '../gameObjects/PlanetObject.js';
import OrbitPathObject from '../gameObjects/OrbitPathObject.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newPlanet() {
    const geometry = new CircleGeomety(this.gl);
    const solidMaterial = this.materialBuilder.buildSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const planet = new PlanetObject(mesh);

    return planet;
  }

  newOrbitPath() {
    const geometry = new DonutGeometry(this.gl);
    const solidMaterial = this.materialBuilder.buildSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const orbitPathObject = new OrbitPathObject(mesh);

    return orbitPathObject;
  }
}

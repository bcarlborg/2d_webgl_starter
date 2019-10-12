'use strict';

// import MaterialBuilder from '../materials/MaterialBuilder.js';
import Mesh from '../materials/Mesh.js';
import CircleGeomety from '../geometries/CircleGeometry.js';
// import DonutGeometry from '../geometries/DonutGeometry.js';

import SystemObject from './gameObjects/SystemObject.js';
import PlanetObject from './gameObjects/PlanetObject.js';
// import OrbitPathObject from './gameObjects/OrbitPathObject.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newSystem() {
    const system = new SystemObject();
    const planet = this.newPlanetObject();

    system.addCenterObject(planet);
    planet.addParentObject(system);

    return ({
      drawable: [planet],
      updateable: [system, planet],
    });
  }

  newPlanetObject() {
    const geometry = new CircleGeomety(this.gl);
    const solidMaterial = this.materialBuilder.buildSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const planet = new PlanetObject(mesh);
    return planet;
  }
}

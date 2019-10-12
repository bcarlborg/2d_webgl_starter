'use strict';

// import MaterialBuilder from '../materials/MaterialBuilder.js';
import Mesh from '../materials/Mesh.js';
import CircleGeomety from '../geometries/CircleGeometry.js';
import DonutGeometry from '../geometries/DonutGeometry.js';

import PlanetObject from './gameObjects/PlanetObject.js';
import OrbitPathObject from './gameObjects/OrbitPathObject.js';

export default class SystemBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newPlanetWithOrbit() {
    const geometry = new CircleGeomety(this.gl);
    const solidMaterial = this.materialBuilder.buildSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const planet = new PlanetObject(mesh);

    const orbitPathGeometry = new DonutGeometry(this.gl);
    const orbitPathMaterial = this.materialBuilder.buildSolidMaterial('300');
    const orbitPathMesh = new Mesh(orbitPathMaterial, orbitPathGeometry);
    const orbitPathObject = new OrbitPathObject(orbitPathMesh, planet);

    planet.addOrbitPath(orbitPathObject);

    return [planet, orbitPathObject];
  }
}

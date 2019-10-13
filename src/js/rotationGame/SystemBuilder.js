'use strict';

import Mesh from '../materials/Mesh.js';
import CircleGeomety from '../geometries/CircleGeometry.js';
import DonutGeometry from '../geometries/DonutGeometry.js';

import SystemObject from './gameObjects/SystemObject.js';
import PlanetObject from './gameObjects/PlanetObject.js';
import OrbitPathObject from './gameObjects/OrbitPathObject.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newSystem(sizes, parentNode) {
    const system = new SystemObject();
    if (parentNode) system.addParentObject(parentNode);

    const planet = this.newPlanetObject();
    system.addCenterObject(planet, sizes.centerPlanetSize);

    const pathObject = this.newPathObject();
    system.addOrbitPath(pathObject, sizes.orbitDistance, sizes.orbitRate);

    return ({
      system,
      drawable: [planet, pathObject],
      updateable: [system, planet, pathObject],
      clickable: [planet],
    });
  }

  newPathObject() {
    const geometry = new DonutGeometry(this.gl);
    const solidMaterial = this.materialBuilder.buildSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const pathObject = new OrbitPathObject(mesh);
    return pathObject;
  }

  newPlanetObject() {
    const geometry = new CircleGeomety(this.gl);
    const solidMaterial = this.materialBuilder.buildStripedMaterial('200', '900');
    const mesh = new Mesh(solidMaterial, geometry);
    const planet = new PlanetObject(mesh);
    return planet;
  }
}

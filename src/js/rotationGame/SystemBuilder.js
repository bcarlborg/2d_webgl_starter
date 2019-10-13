'use strict';

import Mesh from '../materials/Mesh.js';
import CircleGeomety from '../geometries/CircleGeometry.js';
import DonutGeometry from '../geometries/DonutGeometry.js';
import QuadGeometry from '../geometries/QuadGeometry.js';

import SystemObject from './gameObjects/SystemObject.js';
import PlanetObject from './gameObjects/PlanetObject.js';
import OrbitPathObject from './gameObjects/OrbitPathObject.js';
import DragObject from './gameObjects/DragObject.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newSystem(sizes, parentNode) {
    const system = new SystemObject();
    if (parentNode) system.addParentSystem(parentNode);

    const planet = this.newPlanetObject();
    system.addCenterObject(planet, sizes.centerPlanetSize);

    const pathObject = this.newPathObject();
    system.addOrbitPath(pathObject, sizes.orbitDistance, sizes.orbitRate);

    return {
      system,
      objs: [system, planet, pathObject],
    };
  }

  newGridObject() {
    const geometry = new QuadGeometry(this.gl);
    const solidMaterial = this.materialBuilder.buildGridMaterial('600', '700');
    const mesh = new Mesh(solidMaterial, geometry);
    const dragObject = new DragObject(mesh);
    return dragObject;
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

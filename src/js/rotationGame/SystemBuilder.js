'use strict';

import Mesh from '../materials/Mesh.js';
import CircleGeomety from '../geometries/CircleGeometry.js';
import DonutGeometry from '../geometries/DonutGeometry.js';
import QuadGeometry from '../geometries/QuadGeometry.js';
import TexturedQuadGeometry from '../geometries/TexturedQuadGeometry.js';

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
    if (parentNode) parentNode.addChildSystem(system);

    const planet = this.newPlanetObject();
    system.addCenterObject(planet, sizes.centerPlanetSize);

    const pathObject = this.newPathObject();
    system.addOrbitPath(pathObject, sizes.orbitDistance, sizes.orbitRate);

    return {
      system,
      objs: [system, planet, pathObject],
    };
  }

  newTextureObject() {
    const geometry = new TexturedQuadGeometry(this.gl);
    const textureMaterial = this.materialBuilder.constructTexturedMaterial();
    const mesh = new Mesh(textureMaterial, geometry);
    const texturedObject = new DragObject(mesh);
    return texturedObject;
  }

  newGridObject() {
    const geometry = new QuadGeometry(this.gl);
    const solidMaterial = this.materialBuilder.buildGridMaterial('concrete', '900', 'wetAsphalt', '900');
    const mesh = new Mesh(solidMaterial, geometry);
    const dragObject = new DragObject(mesh);
    return dragObject;
  }

  newPathObject() {
    const geometry = new DonutGeometry(this.gl);
    const solidMaterial = this.materialBuilder.buildRandomSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const pathObject = new OrbitPathObject(mesh);
    return pathObject;
  }

  newPlanetObject() {
    const geometry = new CircleGeomety(this.gl);
    const solidMaterial = this.materialBuilder.buildStripedMaterial('nephritis', '200', '900');
    const mesh = new Mesh(solidMaterial, geometry);
    const planet = new PlanetObject(mesh);
    return planet;
  }
}

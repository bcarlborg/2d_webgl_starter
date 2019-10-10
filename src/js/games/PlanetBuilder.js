'use strict';

// import MaterialBuilder from '../materials/MaterialBuilder.js';
import QuadGeometry from '../geometries/QuadGeometry.js';
import PlanetObject from '../gameObjects/PlanetObject.js';
import Mesh from '../Mesh.js';

export default class PlanetBuilder {
  constructor(gl, timeObject, materialBuilder) {
    this.gl = gl;
    this.timeObject = timeObject;
    // this.materialBuilder = new MaterialBuilder(this.gl);
    this.materialBuilder = materialBuilder;
  }

  newPlanet(parentPlanet) {
    const geometry = new QuadGeometry(this.gl);
    const solidMaterial = this.materialBuilder.buildSolidMaterial('300');
    const mesh = new Mesh(solidMaterial, geometry);
    const planet = new PlanetObject(mesh, parentPlanet, 0.5, this.timeObject);

    planet.rotationRadius = 1.50;
    planet.scaleFactor = 0.15;
    planet.rotationSpeed = 0.7;

    return planet;
  }
}

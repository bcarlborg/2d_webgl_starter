'use strict';

import Mesh from '../../materials/Mesh.js';
import TexturedQuadGeometry from '../../geometries/TexturedQuadGeometry.js';
import SpaceBaseObject from './SpaceBaseObject.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newAstroid() {
    this.textureMaterial = this.materialBuilder.constructTexturedMaterial('asteroid.png');
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const asteroidMesh = new Mesh(this.textureMaterial, texturedQuad);
    return new SpaceBaseObject(asteroidMesh);
  }
}

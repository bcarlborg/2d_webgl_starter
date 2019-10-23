'use strict';

import Mesh from '../../materials/Mesh.js';
import TexturedQuadGeometry from '../../geometries/TexturedQuadGeometry.js';
import Astroid from './Astroid.js';
import SpaceShip from './SpaceShip.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newAstroid() {
    const randomAstroidIndex = Math.floor(Math.random() * 3 + 1);
    const randomAstroidFile = `astroid${randomAstroidIndex}.png`;
    this.textureMaterial = this.materialBuilder.constructTexturedMaterial(randomAstroidFile);
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const asteroidMesh = new Mesh(this.textureMaterial, texturedQuad);
    return new Astroid(asteroidMesh);
  }

  newSpaceShip() {
    this.textureMaterial = this.materialBuilder.constructTexturedMaterial('spaceShip.png');
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const spaceShipMesh = new Mesh(this.textureMaterial, texturedQuad);
    return new SpaceShip(spaceShipMesh);
  }
}

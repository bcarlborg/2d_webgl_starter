'use strict';

import Mesh from '../../materials/Mesh.js';
import TexturedQuadGeometry from '../../geometries/TexturedQuadGeometry.js';
import DonutGeometry from '../../geometries/DonutGeometry.js';
import GenericObject from './GenericObject.js';
import Astroid from './Astroid.js';
import SpaceShip from './SpaceShip.js';
import Boundry from './Boundry.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.materialBuilder = materialBuilder;
  }

  newBackground() {
    const backgroundMaterial = this.materialBuilder.constructBackgroundMaterial('background.jpg');
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const backgroundMesh = new Mesh(backgroundMaterial, texturedQuad);
    return new GenericObject(backgroundMesh);
  }

  newAstroid() {
    const randomAstroidIndex = Math.floor(Math.random() * 3 + 1);
    const randomAstroidFile = `astroid${randomAstroidIndex}.png`;
    const textureMaterial = this.materialBuilder.constructTexturedMaterial(randomAstroidFile);
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const asteroidMesh = new Mesh(textureMaterial, texturedQuad);
    return new Astroid(asteroidMesh);
  }

  newSpaceShip() {
    const textureMaterial = this.materialBuilder.constructTexturedMaterial('spaceShip.png');
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const spaceShipMesh = new Mesh(textureMaterial, texturedQuad);
    return new SpaceShip(spaceShipMesh);
  }

  newBoundry(radius) {
    const solidMaterial = this.materialBuilder.buildSolidMaterial('pomegranate', 500);
    const boundryDonut = new DonutGeometry(this.gl, 0.995);
    const boundryMesh = new Mesh(solidMaterial, boundryDonut);
    return new Boundry(boundryMesh, radius);
  }
}

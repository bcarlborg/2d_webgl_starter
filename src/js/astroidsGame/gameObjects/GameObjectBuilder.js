'use strict';

import Mesh from '../../materials/Mesh.js';
import TexturedQuadGeometry from '../../geometries/TexturedQuadGeometry.js';
import DonutGeometry from '../../geometries/DonutGeometry.js';
import GenericObject from './GenericObject.js';
import BlackHole from './BlackHole.js';
import GameNode from './GameNode.js';
import Astroid from './Astroid.js';
import SpaceShip from './SpaceShip.js';
import Boundry from './Boundry.js';

export default class PlanetBuilder {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.forceGenerators = [];
    this.materialBuilder = materialBuilder;
  }

  newBackground() {
    const backgroundMaterial = this.materialBuilder.constructBackgroundMaterial('stars.jpg');
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const backgroundMesh = new Mesh(backgroundMaterial, texturedQuad);
    return new GenericObject(backgroundMesh);
  }

  newBlackHole() {
    const blackHoleMaterial = this.materialBuilder.constructTexturedMaterial('blackHole.png');
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const blackHoleMesh = new Mesh(blackHoleMaterial, texturedQuad);
    const blackHole = new BlackHole(blackHoleMesh);
    this.forceGenerators.push(blackHole);
    blackHole.setPosition(-9, 9, 0);
    blackHole.setScale(7);
    return blackHole;
  }

  newAstroid() {
    const randomAstroidIndex = Math.floor(Math.random() * 3 + 1);
    const randomAstroidFile = `astroid${randomAstroidIndex}.png`;
    const textureMaterial = this.materialBuilder.constructTexturedMaterial(randomAstroidFile);
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const asteroidMesh = new Mesh(textureMaterial, texturedQuad);
    return new Astroid(asteroidMesh, this.forceGenerators);
  }

  newSpaceShip() {
    const textureMaterial = this.materialBuilder.constructTexturedMaterial('spaceShip.png');
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const spaceShipMesh = new Mesh(textureMaterial, texturedQuad);
    const thrusterMaterial = this.materialBuilder.constructTexturedMaterial('thrust.png');

    const thrustQuad = new TexturedQuadGeometry(this.gl);
    const thrustMesh = new Mesh(thrusterMaterial, thrustQuad);
    const thrustObjects = [];
    thrustObjects.push(new GameNode(thrustMesh));
    thrustObjects.push(new GameNode(thrustMesh));
    thrustObjects.push(new GameNode(thrustMesh));

    return new SpaceShip(spaceShipMesh, thrustObjects, this.forceGenerators);
  }

  newBoundry(radius) {
    const solidMaterial = this.materialBuilder.buildSolidMaterial('pomegranate', 500);
    const boundryDonut = new DonutGeometry(this.gl, 0.995);
    const boundryMesh = new Mesh(solidMaterial, boundryDonut);
    return new Boundry(boundryMesh, radius);
  }
}

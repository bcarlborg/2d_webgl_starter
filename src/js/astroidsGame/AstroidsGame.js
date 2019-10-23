'use strict';

import ClickHandler from '../ClickHandler.js';
import KeyHandler from '../KeyHandler.js';
import SpaceBaseObject from './gameObjects/SpaceBaseObject.js';
import TexturedQuadGeometry from '../geometries/TexturedQuadGeometry.js';
import Mesh from '../materials/Mesh.js';

export default class AstroidsGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.clickHandler = new ClickHandler();
    this.keyHandler = new KeyHandler();

    this.gameObjects = [];
    this.textureMaterial = materialBuilder.constructTexturedMaterial();
    const texturedQuad = new TexturedQuadGeometry(this.gl);
    const asteroidMesh = new Mesh(this.textureMaterial, texturedQuad);
    const astroid = new SpaceBaseObject(asteroidMesh);
    this.gameObjects.push(astroid);
    console.log(astroid);

    this.initializeSystem();
  }

  initializeSystem() {
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(
      this.gl.SRC_ALPHA,
      this.gl.ONE_MINUS_SRC_ALPHA,
    );
  }


  getAllObjects() {
    return this.gameObjects;
  }
}

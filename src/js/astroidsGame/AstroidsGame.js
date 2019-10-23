'use strict';

import GameObjectBuilder from './gameObjects/GameObjectBuilder.js';
import ClickHandler from '../ClickHandler.js';
import KeyHandler from '../KeyHandler.js';

export default class AstroidsGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.clickHandler = new ClickHandler();
    this.keyHandler = new KeyHandler();
    this.gameObjectBuilder = new GameObjectBuilder(this.gl, materialBuilder);

    this.gameObjects = [];
    this.initializeSystem();
  }

  initializeSystem() {
    const astroid = this.gameObjectBuilder.newAstroid();
    this.gameObjects.push(astroid);
  }

  getAllObjects() {
    return this.gameObjects;
  }
}

'use strict';

import GameObjectBuilder from './gameObjects/GameObjectBuilder.js';
import OverlayHandler from './OverlayHandler.js';
import Collider from './Collider.js';
import ClickHandler from '../ClickHandler.js';
import KeyHandler from '../KeyHandler.js';
import GameTime from '../GameTime.js';

export default class AstroidsGame {
  constructor(gl, materialBuilder) {
    this.gl = gl;
    this.clickHandler = new ClickHandler();
    this.gameTime = new GameTime();
    this.keyHandler = new KeyHandler();

    // this.registerKeyCallbacks();
    this.OverlayHandler = new OverlayHandler();

    this.gameObjects = [];
    this.gameObjectBuilder = new GameObjectBuilder(this.gl, materialBuilder, this.gameObjects);
    this.initializeSystem();
    this.collider = new Collider(this.gameObjects);
  }

  initializeSystem() {
    // for (let i = 0; i < 15; i++) {
    //   const astroid = this.gameObjectBuilder.newAstroid();
    //   this.gameObjects.push(astroid);
    // }

    const background = this.gameObjectBuilder.newBackground();
    this.gameObjects.push(background);

    // const blackHole = this.gameObjectBuilder.newBlackHole();
    // this.gameObjects.push(blackHole);

    const redBulge = this.gameObjectBuilder.newRedBulge();
    this.gameObjects.push(redBulge);

    const astroid = this.gameObjectBuilder.newAstroid();
    this.gameObjects.push(astroid);
    this.gameObjects.push(this.gameObjectBuilder.newBoundry(50));

    this.spaceShip = this.gameObjectBuilder.newSpaceShip();
    this.gameObjects.push(this.spaceShip);
  }

  setFollowCamera(camera) {
    camera.bindPositionToObject(this.spaceShip);
  }

  update() {
    this.collider.handleAllCollisions();
  }


  getAllObjects() {
    return this.gameObjects;
  }
}

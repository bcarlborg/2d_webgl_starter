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

  randomCoordsInBoundry(radius) {
    let isInCircle = false;
    let xCoord = Math.random() * radius - radius;
    let yCoord = Math.random() * radius - radius;

    while (!isInCircle) {
      const pointInCircle = xCoord ** 2 + yCoord ** 2 < radius ** 2;
      if (pointInCircle) {
        isInCircle = true;
      } else {
        xCoord = Math.random() * radius;
        yCoord = Math.random() * radius;
      }
    }
    return { x: xCoord, y: yCoord };
  }

  initializeSystem() {
    const boundarySize = 80;

    const background = this.gameObjectBuilder.newBackground();
    this.gameObjects.push(background);


    for (let i = 0; i < 3; i++) {
      const blackHole = this.gameObjectBuilder.newBlackHole();
      const randomPosition = this.randomCoordsInBoundry(boundarySize);
      blackHole.setPosition(randomPosition.x, randomPosition.y, 0);
      this.gameObjects.push(blackHole);
    }

    for (let i = 0; i < 3; i++) {
      const redBulge = this.gameObjectBuilder.newRedBulge();
      const randomPosition = this.randomCoordsInBoundry(boundarySize);
      redBulge.setPosition(randomPosition.x, randomPosition.y, 0);
      this.gameObjects.push(redBulge);
    }

    this.buildAstroids(45);

    this.gameObjects.push(this.gameObjectBuilder.newBoundry(2 * boundarySize));

    this.spaceShip = this.gameObjectBuilder.newSpaceShip();
    this.gameObjects.push(this.spaceShip);
  }

  setFollowCamera(camera) {
    camera.bindPositionToObject(this.spaceShip);
  }

  buildAstroids(number) {
    for (let i = 0; i < number; i++) {
      const astroid = this.gameObjectBuilder.newAstroid();
      const randomPosition = this.randomCoordsInBoundry(80);
      astroid.setPosition(randomPosition.x, randomPosition.y, 0);
      this.gameObjects.push(astroid);
    }
  }

  pruneObjects() {
    const initialCount = this.gameObjects.length;
    const radius = 2 * 80;
    this.gameObjects = this.gameObjects.filter((obj) => (
      !obj.collidable || obj.position.x ** 2 + obj.position.y ** 2 < radius ** 2
    ));
    if (this.gameObjects.length < initialCount) {
      this.buildAstroids(initialCount - this.gameObjects.length);
    }
    this.collider.updateGameObject(this.gameObjects);
  }

  update() {
    this.pruneObjects();
    this.gameObjectBuilder.updateGameObjects(this.gameObjects);
    this.collider.handleAllCollisions();
  }


  getAllObjects() {
    return this.gameObjects;
  }
}

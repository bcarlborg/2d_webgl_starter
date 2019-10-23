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
    this.collidableObjects = [];
    this.initializeSystem();
  }

  initializeSystem() {
    // for (let i = 0; i < 15; i++) {
    //   const astroid = this.gameObjectBuilder.newAstroid();
    //   this.gameObjects.push(astroid);
    // }
    const astroid = this.gameObjectBuilder.newAstroid();
    this.gameObjects.push(astroid);
    this.gameObjects.push(this.gameObjectBuilder.newBoundry(50));

    const spaceShip = this.gameObjectBuilder.newSpaceShip();
    this.gameObjects.push(spaceShip);

    this.collidableObjects = [];
    this.gameObjects.forEach((obj) => {
      if (obj.collidable) this.collidableObjects.push(obj);
    });
  }

  update() {
    this.executeCollider();
  }

  executeCollider() {
    for (let i = 0; i < this.collidableObjects.length; i++) {
      for (let j = i + 1; j < this.collidableObjects.length; j++) {
        const obj1 = this.collidableObjects[i];
        const obj2 = this.collidableObjects[j];
        const distance = Math.sqrt(
          (obj1.position.x - obj2.position.x) ** 2 + (obj1.position.y - obj2.position.y) ** 2,
        );

        // if distance is less than the 2 radius combined then do the below
        if (distance < obj1.collisionCircleRadius + obj2.collisionCircleRadius) {
          const normalVecX = (obj2.position.x - obj1.position.x) / distance;
          const normalVecY = (obj2.position.y - obj1.position.y) / distance;
          const p = (
            2 * (
              obj1.velocity.x * normalVecX
            + obj1.velocity.y * normalVecY
            - obj2.velocity.x * normalVecX
            - obj2.velocity.y * normalVecY
            )
          ) / (1 / obj1.invMass + 1 / obj2.invMass);

          obj1.setVelocity(
            obj1.velocity.x - p * (1 / obj1.invMass) * normalVecX,
            obj1.velocity.y - p * (1 / obj1.invMass) * normalVecY,
            0.0,
          );
          obj2.setVelocity(
            obj2.velocity.x + p * (1 / obj2.invMass) * normalVecX,
            obj2.velocity.y + p * (1 / obj2.invMass) * normalVecY,
            0.0,
          );

          const midpointX = (obj1.position.x + obj2.position.x) / 2;
          const midpointY = (obj1.position.y + obj2.position.y) / 2;

          const obj1X = midpointX
            + (obj1.collisionCircleRadius * (obj1.position.x - obj2.position.x)) / distance;
          const obj1Y = midpointY
            + (obj1.collisionCircleRadius * (obj1.position.y - obj2.position.y)) / distance;

          const obj2X = midpointX
            + (obj2.collisionCircleRadius * (obj2.position.x - obj1.position.x)) / distance;
          const obj2Y = midpointY
            + (obj2.collisionCircleRadius * (obj2.position.y - obj1.position.y)) / distance;

          obj1.setPosition(obj1X, obj1Y, 0.0);
          obj2.setPosition(obj2X, obj2Y, 0.0);
        }
      }
    }
  }

  getAllObjects() {
    return this.gameObjects;
  }
}

'use strict';

export default class Collider {
  constructor(gameObjects) {
    this.gameObjects = gameObjects;
    this.collidableObjects = [];
    this.updateCollidables(this.gameObjects);
  }

  updateCollidables() {
    this.collidableObjects = [];
    this.gameObjects.forEach((obj) => {
      if (obj.collidable) this.collidableObjects.push(obj);
    });
  }

  updateGameObject(gameObjects) {
    this.gameObjects = gameObjects;
  }

  handleAllCollisions() {
    this.updateCollidables();
    for (let i = 0; i < this.collidableObjects.length; i++) {
      for (let j = i + 1; j < this.collidableObjects.length; j++) {
        const obj1 = this.collidableObjects[i];
        const obj2 = this.collidableObjects[j];
        const distance = Math.sqrt(
          (obj1.position.x - obj2.position.x) ** 2 + (obj1.position.y - obj2.position.y) ** 2,
        );

        if (distance < obj1.collisionCircleRadius + obj2.collisionCircleRadius) {
          this.handleCollision(obj1, obj2, distance);
        }
      }
    }
  }

  handleCollision(obj1, obj2, distance) {
    if (obj1.collideFunc) obj1.collideFunc();
    if (obj2.collideFunc) obj2.collideFunc();
    const normalVecX = (obj2.position.x - obj1.position.x) / distance;
    const normalVecY = (obj2.position.y - obj1.position.y) / distance;
    const p = (
      2 * (obj1.velocity.x * normalVecX + obj1.velocity.y * normalVecY
        - (obj2.velocity.x * normalVecX + obj2.velocity.y * normalVecY))
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

    this.adjustLocations(obj1, obj2, distance);
  }

  adjustLocations(obj1, obj2, distance) {
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

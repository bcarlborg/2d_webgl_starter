'use strict';

import GameNode from './GameNode.js';

export default class Boundry extends GameNode {
  constructor(mesh, radius) {
    super(mesh);
    this.radius = radius;
    this.localMatrix.scale(radius);
  }
}

'use strict';

import GameObject from '../GameObject.js';

export default class OrbitPathObject extends GameObject {
  constructor(mesh) {
    super(mesh);
    this.randomLoc = this.buildRandomLocation();
  }

  buildRandomLocation() {
    const arr = [];
    arr.push(Math.random() * 2 - 1);
    arr.push(Math.random() * 2 - 1);
    arr.push(Math.random() * 2 - 1);
    return arr;
  }

  update() {
    this.modelMatrix.set();
    this.scale(0.15);
    this.translate(...this.randomLoc);
  }
}

'use strict';

import SpaceBaseObject from './SpaceBaseObject.js';

export default class SpaceShip extends SpaceBaseObject {
  constructor(mesh) {
    super(mesh);
    this.foobar = 'foobar';
  }

  update() {
    this.rotate(0.01);
    super.update();
  }
}

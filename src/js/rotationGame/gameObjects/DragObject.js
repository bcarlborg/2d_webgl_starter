'use strict';

import GameObject from '../../GameObject.js';

export default class DragObject extends GameObject {
  constructor(mesh, timeObject) {
    super(mesh, timeObject);
    this.drawable = 'foobar';
  }

  update() {
    this.modelMatrix.set();
    this.modelMatrix.scale(1);
  }
}

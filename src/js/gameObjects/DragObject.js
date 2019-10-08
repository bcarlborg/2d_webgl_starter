'use strict';

import GameObject from '../GameObject.js';

export default class DragObject extends GameObject {
  constructor(mesh, timeObject) {
    super(mesh, timeObject);
    this.foobar = 'foobar';
  }
}

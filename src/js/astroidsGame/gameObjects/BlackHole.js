'use strict';

import GameNode from './GameNode.js';

export default class BlackHole extends GameNode {
  constructor(mesh) {
    super(mesh);
    this.foobar = 'foobar';
  }

  update() {
    super.update();
  }
}

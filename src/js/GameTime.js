'use strict';

import KeyHandler from './KeyHandler.js';

export default class GameTime {
  constructor() {
    if (GameTime.instance) {
      return GameTime.instance;
    }
    GameTime.instance = this;
    this.KeyHandler = new KeyHandler();
    this.paused = false;
    this.dt = 0;
    this.dtSeconds = 0;
    this.t = new Date().getTime();
    this.tSeconds = this.t / 1000;

    return this;
  }

  togglePause() {
    this.paused = !this.paused;
  }

  update() {
    const newTime = new Date().getTime();
    this.dt = newTime - this.t;
    this.dtSeconds = this.dt / 1000;
    this.t = newTime;
    this.tSeconds = this.t / 1000;

    if (this.paused) {
      this.t = 0;
    }
  }
}

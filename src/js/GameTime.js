'use strict';

export default class GameTime {
  constructor() {
    if (GameTime.instance) {
      return GameTime.instance;
    }
    GameTime.instance = this;
    this.dt = 0;
    this.dtSeconds = 0;
    this.t = new Date().getTime();
    this.tSeconds = this.t / 1000;
  }

  update() {
    const newTime = new Date().getTime();
    this.dt = newTime - this.t;
    this.dtSeconds = this.dt / 1000;
    this.t = newTime;
    this.tSeconds = this.t / 1000;
  }
}

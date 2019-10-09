'use strict';

import keyNames from './helpers/keyNames.js';

export default class KeyPressHandler {
  constructor(canvas) {
    if (KeyPressHandler.instance) return KeyPressHandler.instance;
    KeyPressHandler.instance = this;

    this.canvas = canvas;
    this.registerEventHandlers();
    this.keysPressed = {};
    this.clickInfo = {
      clickX: 0.0,
      clickY: 0.0,
    };

    return this;
  }

  registerEventHandlers() {
    document.onkeydown = (event) => {
      this.keysPressed[keyNames[event.keyCode]] = true;
    };

    document.onkeyup = (event) => {
      this.keysPressed[keyNames[event.keyCode]] = false;
    };

    // eslint-disable-next-line no-unused-vars
    this.canvas.onmousedown = (event) => {
      const { clientX, clientY } = event;

      const scaledX = clientX / this.canvas.clientWidth;
      const scaledY = clientY / this.canvas.clientHeight;

      this.clickInfo.clickX = scaledX * 2 - 1;
      this.clickInfo.clickY = scaledY * -2 + 1;
      console.log(this.clickInfo);
    };

    this.canvas.onmousemove = (event) => {
      event.stopPropagation();
    };

    // eslint-disable-next-line no-unused-vars
    this.canvas.onmouseout = (event) => {
    };

    // eslint-disable-next-line no-unused-vars
    this.canvas.onmouseup = (event) => {
    };
  }

  onKeyDown() {

  }

  onKeyUp() {

  }
}

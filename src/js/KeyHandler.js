'use strict';

import keyNames from './helpers/keyNames.js';

export default class KeyHandler {
  constructor() {
    if (KeyHandler.instance) return KeyHandler.instance;
    KeyHandler.instance = this;

    this.registerEventHandlers();
    this.keysPressed = {};
    return this;
  }

  registerEventHandlers() {
    document.onkeydown = (event) => {
      this.keysPressed[keyNames[event.keyCode]] = true;
    };

    document.onkeyup = (event) => {
      this.keysPressed[keyNames[event.keyCode]] = false;
    };
  }
}

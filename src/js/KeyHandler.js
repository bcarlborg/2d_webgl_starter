'use strict';

import keyNames from './helpers/keyNames.js';

export default class KeyHandler {
  constructor() {
    if (KeyHandler.instance) return KeyHandler.instance;
    KeyHandler.instance = this;

    this.registerEventHandlers();
    this.keysPressed = {};
    this.keyCallbacks = {};
    return this;
  }

  registerClallback(keyName, callback) {
    if (!this.keyCallbacks[keyName]) {
      this.keyCallbacks[keyName] = [];
    }
    this.keyCallbacks[keyName].push(callback);
  }

  spacePress() {
    if (this.keyCallbacks.SPACE) {
      this.keyCallbacks.SPACE.forEach((callback) => {
        callback();
      });
    }
  }

  registerEventHandlers() {
    document.onkeydown = (event) => {
      const keyName = keyNames[event.keyCode];
      if (!this.keysPressed[keyName]) {
        this.spacePress();
      }
      this.keysPressed[keyName] = true;
    };

    document.onkeyup = (event) => {
      this.keysPressed[keyNames[event.keyCode]] = false;
    };
  }
}

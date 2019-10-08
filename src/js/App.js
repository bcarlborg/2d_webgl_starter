'use strict';

import Scene from './Scene.js';
import keyNames from './helpers/keyNames.js';

export default class App {
  constructor(canvas, overlay) {
    this.canvas = canvas;
    this.overlay = overlay;
    this.gl = canvas.getContext('webgl2', { alpha: false });
    if (this.gl === null) {
      throw new Error('Browser does not support WebGL2');
    }

    this.keysPressed = {};
    this.gl.pendingResources = {};
    this.scene = new Scene(this.gl);
    this.resize();
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.scene.resize(this.gl, this.canvas);
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
      console.log('mouse down', event.x, event.y);
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

    window.addEventListener('resize', () => this.resize());
    window.requestAnimationFrame(() => this.update());
  }

  // animation frame update
  update() {
    const pendingResourceNames = Object.keys(this.gl.pendingResources);
    if (pendingResourceNames.length === 0) {
      this.scene.update(this.keysPressed);
    } else {
      this.overlay.innerHTML = `<font color="red">Loading: ${pendingResourceNames}</font>`;
    }

    window.requestAnimationFrame(() => this.update());
  }
}

// entry point from HTML
window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const overlay = document.getElementById('overlay');

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});

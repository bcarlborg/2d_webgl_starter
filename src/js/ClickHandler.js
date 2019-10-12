'use strict';

import wglm from './helpers/WebGLMath.js';

export default class ClickHandler {
  constructor() {
    if (ClickHandler.instance) return ClickHandler.instance;
    ClickHandler.instance = this;

    this.canvas = document.getElementById('canvas');
    this.registerEventHandlers();
    this.orthoCamera = null;

    this.clickLoc = {
      x: null,
      y: null,
    };

    return this;
  }

  addOrthoCamera(orthoCamera) {
    this.orthoCamera = orthoCamera;
  }

  getRealWorldClickLocation(event) {
    const { clientX, clientY } = event;
    const scaledX = clientX / this.canvas.clientWidth;
    const scaledY = clientY / this.canvas.clientHeight;

    const realWorld = {
      x: scaledX * 2 - 1,
      y: scaledY * -2 + 1,
    };

    if (this.orthoCamera) {
      const clickLoc = new wglm.Vec2(
        realWorld.x, realWorld.y,
      );

      const cameraTranslationMatrix = this.orthoCamera.viewProjMatrix.clone().invert();
      const realWorldVec = clickLoc.xy01mul(cameraTranslationMatrix);

      realWorld.x = realWorldVec.x;
      realWorld.y = realWorldVec.y;
    }

    this.clickLoc.x = realWorld.x;
    this.clickLoc.y = realWorld.y;
  }

  registerEventHandlers() {
    this.canvas.onmousedown = (event) => {
      this.getRealWorldClickLocation(event);
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
}

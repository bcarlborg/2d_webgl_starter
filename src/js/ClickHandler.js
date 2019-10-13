'use strict';

import wglm from './helpers/WebGLMath.js';

export default class ClickHandler {
  constructor() {
    if (ClickHandler.instance) return ClickHandler.instance;
    ClickHandler.instance = this;

    this.canvas = document.getElementById('canvas');
    this.registerEventHandlers();
    this.orthoCamera = null;

    this.callbacks = {
      onclick: [],
      ondrag: [],
    };

    this.mouseDown = false;
    this.isClick = false;
    this.currX = null;
    this.currY = null;

    return this;
  }

  registerEventHandlers() {
    this.canvas.onmousedown = (event) => {
      this.mouseDown = true;
      this.isClick = true;
      this.currX = event.clientX;
      this.currY = event.clientY;
    };

    this.canvas.onmousemove = (event) => {
      event.stopPropagation();
      if (this.mouseDown) {
        this.isClick = false;
        const diff = {};
        diff.x = event.clientX - this.currX;
        diff.y = event.clientY - this.currY;
        this.currX = event.clientX;
        this.currY = event.clientY;
        this.gameDrag(diff);
      }
    };

    // eslint-disable-next-line no-unused-vars
    this.canvas.onmouseout = (event) => {
    };

    // eslint-disable-next-line no-unused-vars
    this.canvas.onmouseup = (event) => {
      this.mouseDown = false;
      if (this.isClick) {
        this.gameClick(event);
      }
    };
  }

  addOrthoCamera(orthoCamera) {
    this.orthoCamera = orthoCamera;
  }

  addEventCallback(eventName, callback) {
    this.callbacks[eventName].push(callback);
  }

  clientCoordToNormal(clientX, clientY) {
    const scaledX = clientX / this.canvas.clientWidth;
    const scaledY = clientY / this.canvas.clientHeight;

    const realWorld = {
      x: scaledX * 2 - 1,
      y: scaledY * -2 + 1,
    };

    return realWorld;
  }

  clientDiffToNormal(diffX, diffY) {
    const scaledX = diffX / this.canvas.clientWidth;
    const scaledY = diffY / this.canvas.clientHeight;

    const realWorldDiff = {
      x: scaledX * 2,
      y: scaledY * -2,
    };
    return realWorldDiff;
  }

  getRealWorldClickLocation(event) {
    const realWorld = this.clientCoordToNormal(event.clientX, event.clientY);
    if (this.orthoCamera) {
      const clickLoc = new wglm.Vec2(
        realWorld.x, realWorld.y,
      );

      const cameraTranslationMatrix = this.orthoCamera.viewProjMatrix.clone().invert();
      const realWorldVec = clickLoc.xy01mul(cameraTranslationMatrix);

      realWorld.x = realWorldVec.x;
      realWorld.y = realWorldVec.y;
    }
    const clickPoint = new wglm.Vec3(realWorld.x, realWorld.y, 0.0);
    return clickPoint;
  }

  gameClick(event) {
    const realWorldPoint = this.getRealWorldClickLocation(event);
    const myEvent = { clickLoc: realWorldPoint };
    this.callbacks.onclick.forEach((callback) => callback(myEvent));
  }

  gameDrag(clientDiff) {
    const realWorldDiff = this.clientDiffToNormal(clientDiff.x, clientDiff.y);
    console.log(realWorldDiff);
  }
}

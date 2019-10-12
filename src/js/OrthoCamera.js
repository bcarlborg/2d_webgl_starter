'use strict';

import wglm from './helpers/WebGLMath.js';

export default class OrthoCamera extends wglm.UniformProvider {
  constructor(programs, keyPressHandler) {
    super('camera');

    this.keyPressHandler = keyPressHandler;
    this.keysPressed = this.keyPressHandler.keysPressed;
    this.clickInfo = this.keyPressHandler.clickInfo;

    this.position = new wglm.Vec3(0.0, 0.0, 0.0);
    this.rotation = 0;
    this.scaleFactor = 1;
    this.windowSize = new wglm.Vec2(1, 1);

    this.addComponentsAndGatherUniforms(...programs);
  }

  update() {
    this.processKeysPressed();
    this.viewProjMatrix
      .set()
      .scale(this.windowSize)
      .scale(this.scaleFactor)
      .rotate(this.rotation)
      .translate(this.position)
      .invert();

    const clickLoc = new wglm.Vec2(
      this.clickInfo.clickX, this.clickInfo.clickY,
    );

    const newClick = clickLoc.xy01mul(this.viewProjMatrix.clone().invert());
  }

  processKeysPressed() {
    this.processCameraPan();
    this.processCameraRotate();
    this.processCameraZoom();
  }

  processCameraPan() {
    const panDelta = 0.05;
    if (this.keysPressed.UP || this.keysPressed.I) {
      this.position.y += panDelta;
    }
    if (this.keysPressed.DOWN || this.keysPressed.K) {
      this.position.y -= panDelta;
    }
    if (this.keysPressed.LEFT || this.keysPressed.J) {
      this.position.x -= panDelta;
    }
    if (this.keysPressed.RIGHT || this.keysPressed.L) {
      this.position.x += panDelta;
    }
  }

  processCameraRotate() {
    const rotateDelta = 0.05;
    if (this.keysPressed.Q) {
      this.rotation -= rotateDelta;
    }
    if (this.keysPressed.E) {
      this.rotation += rotateDelta;
    }
  }

  processCameraZoom() {
    const zoomDelta = 0.05;
    if (this.keysPressed.Z) {
      if (this.scaleFactor > 0.5) {
        this.scaleFactor -= zoomDelta;
      }
    }
    if (this.keysPressed.X) {
      this.scaleFactor += zoomDelta;
    }
  }

  setAspectRatio(ar) {
    this.windowSize.x = this.windowSize.y * ar;
    this.update();
  }
}

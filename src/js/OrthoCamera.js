'use strict';

import wglm from './helpers/WebGLMath.js';
import KeyHandler from './KeyHandler.js';
import ClickHandler from './ClickHandler.js';

export default class OrthoCamera extends wglm.UniformProvider {
  constructor(programs) {
    super('camera');
    this.isBound = false;
    this.boundObject = null;
    this.position = new wglm.Vec3(0.0, 0.0, 0.0);
    this.rotation = 0;
    this.rotationMatrix = new wglm.Mat4();
    this.scaleFactor = 1;
    this.windowSize = new wglm.Vec2(20, 20);

    this.keysPressed = (new KeyHandler()).keysPressed;
    this.clickHandler = new ClickHandler();
    this.clickHandler.addEventCallback('ondrag', this.onDragCallback.bind(this));

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
  }

  bindPositionToObject(object) {
    this.isBound = true;
    this.boundObject = object;
  }

  processKeysPressed() {
    if (this.isBound) {
      this.processFollowPan();
    } else {
      this.processCameraPan();
    }
    this.processCameraRotate();
    this.processCameraZoom();
  }

  onDragCallback(event) {
    if (!this.isBound) {
      const vec = new wglm.Vec3(event.x, event.y, 0.0);
      vec.mul(-1);
      vec.mul(this.scaleFactor);
      vec.xyz1mul(this.rotationMatrix);
      this.position.add(vec);
    }
  }

  processFollowPan() {
    const vec = new wglm.Vec3(this.boundObject.position);
    vec.xyz1mul(this.rotationMatrix);
    this.position.set(vec);
  }

  processCameraPan() {
    const panDelta = 0.05;
    const vec = new wglm.Vec3();
    if (this.keysPressed.I) {
      vec.y = panDelta;
    }
    if (this.keysPressed.K) {
      vec.y = -1 * panDelta;
    }
    if (this.keysPressed.J) {
      vec.x = -1 * panDelta;
    }
    if (this.keysPressed.L) {
      vec.x = panDelta;
    }
    vec.xyz1mul(this.rotationMatrix);
    this.position.add(vec);
  }

  processCameraRotate() {
    const rotateDelta = 0.05;
    if (this.keysPressed.Q) {
      this.rotation -= rotateDelta;
    }
    if (this.keysPressed.E) {
      this.rotation += rotateDelta;
    }

    this.rotationMatrix.set();
    this.rotationMatrix.rotate(this.rotation);
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

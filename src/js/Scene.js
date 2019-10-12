'use strict';

import wglm from './helpers/WebGLMath.js';
import OrthoCamera from './OrthoCamera.js';
import RotationGame from './rotationGame/RotationGame.js';
import GameTime from './GameTime.js';
import ClickHandler from './ClickHandler.js';
import MaterialBuilder from './materials/MaterialBuilder.js';
import BoundingBox from './BoundingBox.js';

/* exported Scene */
export default class Scene extends wglm.UniformProvider {
  constructor(gl) {
    super('scene');
    this.gl = gl;
    this.background = [0.1, 0.1, 0.0];

    this.materialBuilder = new MaterialBuilder(this.gl);
    this.game = new RotationGame(this.gl, this.materialBuilder);
    this.gameTime = new GameTime();
    this.clickHandler = new ClickHandler();
    this.initCamera();

    const a = new BoundingBox();
  }

  initCamera() {
    const activePrograms = this.materialBuilder.getActivePrograms();
    this.camera = new OrthoCamera(activePrograms);
    this.addComponentsAndGatherUniforms(...activePrograms);
    this.clickHandler.addOrthoCamera(this.camera);
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    this.camera.setAspectRatio(canvas.clientWidth / canvas.clientHeight);
  }

  clearBackground() {
    this.gl.clearColor(...this.background, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  update() {
    this.clearBackground();

    this.camera.update();
    this.camera.draw();
    this.gameTime.update();

    const updateableObjects = this.game.updateableObjectsForNexFrame();
    updateableObjects.forEach((gameObject) => {
      gameObject.update();
    });

    const drawbleObjects = this.game.drawableObjectsForNextFrame();
    drawbleObjects.forEach((gameObject) => {
      gameObject.draw(this, this.camera);
    });
  }
}

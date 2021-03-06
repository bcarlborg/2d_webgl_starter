'use strict';

import wglm from './helpers/WebGLMath.js';
import OrthoCamera from './OrthoCamera.js';
import AstroidsGame from './astroidsGame/AstroidsGame.js';
import GameTime from './GameTime.js';
import ClickHandler from './ClickHandler.js';
import MaterialBuilder from './materials/MaterialBuilder.js';

/* exported Scene */
export default class Scene extends wglm.UniformProvider {
  constructor(gl) {
    super('scene');
    this.gl = gl;

    this.materialBuilder = new MaterialBuilder(this.gl);
    this.game = new AstroidsGame(this.gl, this.materialBuilder);
    this.gameTime = new GameTime();
    this.clickHandler = new ClickHandler();
    this.initCamera();
    this.game.setFollowCamera(this.camera);
  }

  initCamera() {
    const activePrograms = this.materialBuilder.getActivePrograms();
    this.camera = new OrthoCamera(activePrograms);
    this.addComponentsAndGatherUniforms(...activePrograms);
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    this.camera.setAspectRatio(canvas.clientWidth / canvas.clientHeight);
  }

  clearBackground() {
    this.background = [0.5, 0.1, 0.0];
    this.gl.clearColor(...this.background, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  update() {
    this.clearBackground();

    this.camera.update();
    this.camera.draw();
    this.gameTime.update();
    this.game.update();

    const objs = this.game.getAllObjects();
    objs.forEach((obj) => {
      obj.update();
    });

    objs.forEach((gameObject) => {
      gameObject.draw();
    });
  }
}

'use strict';

import wglm from './helpers/WebGLMath.js';
import OrthoCamera from './OrthoCamera.js';
import PlanetRotate from './games/PlanetRotate.js';
// import MyColors from './helpers/MyColors.js';
import MaterialBuilder from './materials/MaterialBuilder.js';

/* exported Scene */
export default class Scene extends wglm.UniformProvider {
  constructor(gl, keyPressHandler) {
    super('scene');
    this.gl = gl;
    this.keyPressHandler = keyPressHandler;
    // this.background = MyColors.getRandomColor('800');
    this.background = [0.1, 0.1, 0.0];

    this.materialBuilder = new MaterialBuilder(this.gl);
    this.game = new PlanetRotate(this.gl, this.materialBuilder);
    const activePrograms = this.materialBuilder.getActivePrograms();
    this.camera = new OrthoCamera(activePrograms, this.keyPressHandler);
    this.addComponentsAndGatherUniforms(...activePrograms);
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
    this.game.update();

    this.camera.update();
    this.camera.draw();

    const gameObjects = this.game.getGameObjectsForNextFrame();
    gameObjects.forEach((gameObject) => {
      gameObject.update();
    });
    gameObjects.forEach((gameObject) => {
      gameObject.draw(this, this.camera);
    });
  }
}

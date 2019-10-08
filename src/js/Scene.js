'use strict';

import wglm from './helpers/WebGLMath.js';
import OrthoCamera from './OrthoCamera.js';
import PlanetRotate from './games/PlanetRotate.js';
import MyColors from './helpers/MyColors.js';
import MaterialBuilder from './materials/MaterialBuilder.js';

/* exported Scene */
export default class Scene extends wglm.UniformProvider {
  constructor(gl) {
    super('scene');
    this.gl = gl;

    this.background = MyColors.getRandomColor('800');
    this.clearBackground();

    this.materialBuilder = new MaterialBuilder(this.gl);
    this.game = new PlanetRotate(this.gl, this.materialBuilder);

    this.camera = new OrthoCamera(this.materialBuilder.programs);

    this.addComponentsAndGatherUniforms(...this.materialBuilder.programs);
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

  update(gl, keysPressed) {
    this.clearBackground();
    this.handleKeyPress(keysPressed);

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

  handleKeyPress(keysPressed) {
    if (keysPressed.LEFT) {
      // PRACTICAL TODO: move/rotate/accelerate avatar game object
    }
    if (keysPressed.RIGHT) {
      // PRACTICAL TODO: move/rotate/accelerate avatar game object
    }
    if (keysPressed.UP) {
      // PRACTICAL TODO: move/rotate/accelerate avatar game object
    }
    if (keysPressed.DOWN) {
      // PRACTICAL TODO: move/rotate/accelerate avatar game object
    }
  }
}

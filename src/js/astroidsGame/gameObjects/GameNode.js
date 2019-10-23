'use strict';

import wglm from '../../helpers/WebGLMath.js';
import GameTime from '../../GameTime.js';
import BoundingBox from '../../BoundingBox.js';
import KeyHandler from '../../KeyHandler.js';

export default class GameNode extends wglm.UniformProvider {
  constructor(mesh) {
    super('gameObject');
    this.gameTime = new GameTime();
    this.keysPressed = (new KeyHandler()).keysPressed;

    this.drawable = false;
    this.parentNode = null;
    this.worldMatrix = (new wglm.Mat4()).set();
    this.localMatrix = (new wglm.Mat4()).set();

    if (mesh) {
      this.drawable = true;
      this.addComponentsAndGatherUniforms(mesh);
      this.modelMatrix.set();
      this.boundingBox = new BoundingBox();
    }
  }

  addParentObject(object) {
    this.parentNode = object;
  }

  updateWorldMatrix() {
    this.worldMatrix.set();
    if (this.parentNode) {
      this.worldMatrix.mul(this.localMatrix);
      this.worldMatrix.mul(this.parentNode.worldMatrix);
    } else {
      this.worldMatrix.mul(this.localMatrix);
    }
  }

  update() {
    this.updateWorldMatrix();
    if (this.drawable) {
      this.modelMatrix.set();
      this.modelMatrix.mul(this.worldMatrix);
      this.boundingBox.transformPoints(this.worldMatrix);
    }
  }
}

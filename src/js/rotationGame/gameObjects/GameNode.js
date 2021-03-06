'use strict';

import wglm from '../../helpers/WebGLMath.js';
import GameTime from '../../GameTime.js';
import BoundingBox from '../../BoundingBox.js';
import KeyHandler from '../../KeyHandler.js';

export default class GameNode extends wglm.UniformProvider {
  constructor(mesh, clickable) {
    super('gameObject');
    this.drawable = false;
    this.clickable = clickable;

    GameNode.selected = [];

    this.isSelected = false;
    this.gameTime = new GameTime();
    this.parentNode = null;

    this.keysPressed = (new KeyHandler()).keysPressed;

    this.worldMatrix = (new wglm.Mat4()).set();
    this.localMatrix = (new wglm.Mat4()).set();

    if (mesh) {
      this.drawable = true;
      this.addComponentsAndGatherUniforms(mesh);
      this.modelMatrix.set();
    }

    if (this.clickable) {
      this.boundingBox = new BoundingBox();
    }
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      GameNode.selected.push(this);
    }
  }

  unselect() {
    this.isSelected = false;
  }

  unselectAll() {
    GameNode.selected.forEach((obj) => { obj.unselect(); });
    GameNode.selected = [];
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
    }
    if (this.clickable) {
      this.boundingBox.transformPoints(this.worldMatrix);
    }
  }
}

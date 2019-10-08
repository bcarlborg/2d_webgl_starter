'use strict';

import wglm from './helpers/WebGLMath.js';
import TriangleGeometry from './TriangleGeometry.js';
import QuadGeometry from './QuadGeometry.js';
import Shader from './Shader.js';
import Program from './Program.js';
import OrthoCamera from './OrthoCamera.js';
import Material from './Material.js';
import Mesh from './Mesh.js';
import GameObject from './GameObject.js';
import OrbitingObject from './gameObjects/OrbitingObject.js';
import PlanetRotate from './games/PlanetRotate.js';
import MyColors from './helpers/MyColors.js';
import MaterialBuilder from './materials/MaterialBuilder.js';

/* exported Scene */
export default class Scene extends wglm.UniformProvider {
  constructor(gl) {
    super('scene');
    this.gl = gl;

    this.game = new PlanetRotate();

    this.timeAtFirstFrame = new Date().getTime();
    this.timeAtLastFrame = this.timeAtFirstFrame;
    this.gameObjects = [];

    this.backgroundColor = MyColors.getRandomColor('800');
    this.forgroundColor = MyColors.getRandomColor('500');

    // initialize goemetries
    this.triangleGeometry = new TriangleGeometry(this.gl);
    this.quadGeometry = new QuadGeometry(this.gl);

    this.materialBuilder = new MaterialBuilder(this.gl);
    this.materialBuilder.buildStripedMaterial();

    // initialize meshes
    this.stripedIdleQuadMesh = new Mesh(
      // this.narrowStripedIdleMaterial,
      this.materialBuilder.materials.stripedMaterial,
      this.quadGeometry,
    );

    // build game objects
    this.gameObjects.push(this.testGameObject = new GameObject(this.stripedIdleQuadMesh));
    this.gameObjects.push(this.OrbitingObject = new OrbitingObject(this.stripedIdleQuadMesh));

    this.camera = new OrthoCamera(this.materialBuilder.programs);

    // this makes the uniform the program reflect
    this.addComponentsAndGatherUniforms(...this.materialBuilder.programs);
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    this.camera.setAspectRatio(canvas.clientWidth / canvas.clientHeight);
  }

  clearBackground() {
    this.gl.clearColor(
      this.backgroundColor.r,
      this.backgroundColor.g,
      this.backgroundColor.b,
      1.0,
    );
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  getTimeDeltas() {
    const timeAtThisFrame = new Date().getTime();
    const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
    const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;
    this.timeAtLastFrame = timeAtThisFrame;
    return { dt, t };
  }

  update(gl, keysPressed) {
    const timeDeltas = this.getTimeDeltas();
    this.clearBackground();
    this.handleKeyPress(keysPressed);

    this.game.update();

    this.camera.update(timeDeltas.t);
    this.camera.draw();

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(timeDeltas);
    });

    this.gameObjects.forEach((gameObject) => {
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

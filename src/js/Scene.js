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
import MyColors from './helpers/MyColors.js';

/* exported Scene */
export default class Scene extends wglm.UniformProvider {
  constructor(gl) {
    super('scene');
    this.gl = gl;

    this.timeAtFirstFrame = new Date().getTime();
    this.timeAtLastFrame = this.timeAtFirstFrame;
    this.gameObjects = [];

    this.buidGameObjectsAndPrograms();

    this.backgroundColor = MyColors.getRandomColor('700');
  }

  buidGameObjectsAndPrograms() {
    // initialize programs
    this.vsIdle = new Shader(this.gl, this.gl.VERTEX_SHADER, 'idle-vs.glsl');
    // this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, 'solid-fs.glsl');
    this.fsStriped = new Shader(this.gl, this.gl.FRAGMENT_SHADER, 'striped-fs.glsl');

    this.programs = [];
    this.programs.push(
      (this.stripedProgram = new Program(this.gl, this.vsIdle, this.fsStriped)),
    );

    // initialize camera
    this.camera = new OrthoCamera(this.programs);

    // initialize goemetries
    this.triangleGeometry = new TriangleGeometry(this.gl);
    this.quadGeometry = new QuadGeometry(this.gl);

    // initialize materials
    this.stripedIdleMaterial = new Material(this.gl, this.stripedProgram);
    this.stripedIdleMaterial.solidColor.set(1, 1, 1, 1);

    // initialize meshes
    this.stripedIdleQuadMesh = new Mesh(
      this.stripedIdleMaterial,
      this.quadGeometry,
    );

    // build game objects
    this.testGameObject = new GameObject(this.stripedIdleQuadMesh);
    this.gameObjects.push(this.testGameObject);

    // this makes the uniform the program reflect
    this.addComponentsAndGatherUniforms(...this.programs);
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    this.camera.setAspectRatio(canvas.clientWidth / canvas.clientHeight);
  }

  update(gl, keysPressed) {
    const timeAtThisFrame = new Date().getTime();
    const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
    const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;
    this.timeAtLastFrame = timeAtThisFrame;

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

    // clear the screen
    gl.clearColor(
      this.backgroundColor.r,
      this.backgroundColor.g,
      this.backgroundColor.b,
      1.0
    );
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.camera.update(t);
    this.camera.draw();

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(dt);
    });

    this.gameObjects.forEach((gameObject) => {
      gameObject.draw(this, this.camera);
    });
  }
}

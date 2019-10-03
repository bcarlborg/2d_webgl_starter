'use strict';

import TriangleGeometry from './TriangleGeometry.js';
import QuadGeometry from './QuadGeometry.js';
import Shader from './Shader.js';
import Program from './Program.js';
import OrthoCamera from './OrthoCamera.js';
import Material from './Material.js';
import Mesh from './Mesh.js';
import GameObject from './GameObject.js';

/* exported Scene */
export default class Scene extends UniformProvider {
  constructor(gl) {
    super('scene');
    this.timeAtFirstFrame = new Date().getTime();
    this.timeAtLastFrame = this.timeAtFirstFrame;
    this.gameObjects = [];

    this.triangleGeometry = new TriangleGeometry(gl);
    this.quadGeometry = new QuadGeometry(gl);
    // TODO: create more geometries

    this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, 'idle-vs.glsl');
    this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, 'solid-fs.glsl');
    this.fsStriped = new Shader(gl, gl.FRAGMENT_SHADER, 'striped-fs.glsl');
    // TODO: create more shaders

    this.programs = [];
    // this.programs.push( this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid));
    this.programs.push(
      (this.stripedProgram = new Program(gl, this.vsIdle, this.fsStriped)),
    );
    // TODO: create more programs
    this.camera = new OrthoCamera(this.programs);

    // PRACTICAL TODO: create materials, set properties reflecting uniforms
    this.stripedIdleMaterial = new Material(gl, this.stripedProgram);
    this.stripedIdleMaterial.solidColor.set(1, 1, 1, 1);
    // this.stripedIdleMaterial.stripeWidth.set(0.1);

    this.stripedIdleQuadMesh = new Mesh(
      this.stripedIdleMaterial,
      this.quadGeometry,
    );
    this.testGameObject = new GameObject(this.stripedIdleQuadMesh);
    this.gameObjects.push(this.testGameObject);

    // PRACTICAL TODO: create meshes combining materials and geometries

    // PRACTICAL TODO: create game objects

    this.addComponentsAndGatherUniforms(...this.programs);
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    this.camera.setAspectRatio(canvas.clientWidth / canvas.clientHeight);
  }

  update(gl, keysPressed) {
    // jshint bitwise:false
    // jshint unused:false
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
    gl.clearColor(0.3, 0.0, 0.3, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.camera.update(t);
    this.camera.draw();

    this.gameObjects.forEach((gameObject) => {
      gameObject.update(dt);
    });

    this.gameObjects.forEach((gameObject) => {
      gameObject.draw(this, this.stripedIdleMaterial, this.camera);
    });

    // this.testGameObject.update();
    // this.testGameObject.draw(this, this.stripedIdleMaterial);

    // PRACTICAL TODO: get rid of custom drawing above, use only game objects
    // PRACTICAL TODO: update all game objects
    // PRACTICAL TODO: draw all game objects
  }
}

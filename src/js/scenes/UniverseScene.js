import OrbitScene from './OrbitScene.js';

export default class UniverseScene {
  constructor(gl) {
    this.gl = gl;
    this.orbit = new OrbitScene(gl);
  }

  draw() {
    this.orbit.draw();
  }
}

import UniverseScene from './scenes/UniverseScene.js';
import MyColors from './helpers/MyColors.js';
/* exported Scene */
// eslint-disable-next-line
export default class Scene {
  constructor(gl) {
    this.UniverseScene = new UniverseScene(gl);

    this.background = MyColors.getColor('wetAsphalt', '800');
  }

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  drawBackground(gl) {
    gl.clearColor(
      this.background.r,
      this.background.g,
      this.background.b,
      1.0,
    );
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }


  // eslint-disable-next-line
  update(gl, keysPressed) {
    this.drawBackground(gl);

    // this.triangleGeometry.draw();
    this.UniverseScene.draw();
  }
}

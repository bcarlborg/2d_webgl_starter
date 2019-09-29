
/* exported Scene */
// eslint-disable-next-line
class Scene {
  /* eslint-disable no-undef */
  constructor(gl) {
    this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, 'idle-vs.glsl');
    this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, 'solid-fs.glsl');
    this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
    this.triangleGeometry = new TriangleGeometry(gl);
    this.background = MyColors.getRandomColor('100');
    this.forGround = MyColors.getRandomColor('400');
  }
  /* eslint-enable no-undef */

  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // eslint-disable-next-line
  update(gl, keysPressed) {
    // jshint bitwise:false
    // jshint unused:false

    // clear the screen
    gl.clearColor(
      this.background.r,
      this.background.g,
      this.background.b,
      1.0,
    );
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this.solidProgram.glProgram);


    const colorArray = [this.forGround.r, this.forGround.g, this.forGround.b, 1.0];
    const colorUniformLoc = gl.getUniformLocation(this.solidProgram.glProgram, 'u_color');
    gl.uniform4fv(colorUniformLoc, colorArray);

    this.triangleGeometry.draw();
  }
}

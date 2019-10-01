import Shader from '../Shader.js';
import Program from '../Program.js';
// import IdleVertexShader from '../shaders/IdleVertexShader.js';
import TranslateShader from '../shaders/TranslateShader.js';
import OrbitingVertexShader from '../shaders/OrbitingVertexShader.js';
import SolidFragmentShader from '../shaders/SolidFragmentShader.js';
import CircleGeometry from '../geometries/CircleGeometry.js';
import SpokesGeometry from '../geometries/SpokesGeometry.js';
import MyColors from '../helpers/MyColors.js';

export default class OribitScene {
  constructor(gl) {
    this.gl = gl;
    this.centerObject = new SpokesGeometry(gl);
    this.oribitingObject = new CircleGeometry(gl);
    this.radius = 0.75;

    this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, TranslateShader);
    this.fsSolidCenter = new Shader(gl, gl.FRAGMENT_SHADER, SolidFragmentShader);
    this.solidProgram = new Program(gl, this.vsIdle, this.fsSolidCenter);

    this.vsOrbiting = new Shader(gl, gl.VERTEX_SHADER, OrbitingVertexShader);
    this.fsSolidOrbit = new Shader(gl, gl.FRAGMENT_SHADER, SolidFragmentShader);
    this.orbitProgram = new Program(gl, this.vsOrbiting, this.fsSolidOrbit);

    this.forGround = MyColors.getRandomColor('400');
    this.forGround2 = MyColors.getRandomColor('400');

    this.initTime = new Date();

    // 3. get whole orbit to be translateable
    // 4. get one object rotating at radius
    // 5. get orbits to orbit
  }

  drawCenterObject() {
    const { gl } = this;

    gl.useProgram(this.solidProgram.glProgram);

    const colorArray = [this.forGround.r, this.forGround.g, this.forGround.b, 1.0];
    const colorUniformLoc = gl.getUniformLocation(this.solidProgram.glProgram, 'u_color');
    this.gl.uniform4fv(colorUniformLoc, colorArray);

    const rotationFloat = (Math.PI / 4);
    const rotationUniformLoc = gl.getUniformLocation(this.solidProgram.glProgram, 'u_rotationRadians');
    this.gl.uniform1f(rotationUniformLoc, rotationFloat);

    const scaleArray = [1.0, 1.0, 1.0, 1.0];
    const scaleUniformLoc = gl.getUniformLocation(this.solidProgram.glProgram, 'u_scale');
    this.gl.uniform4fv(scaleUniformLoc, scaleArray);

    const translationArray = [0.0, 0.0, 0.0, 0.0];
    const translationUniformLoc = gl.getUniformLocation(this.solidProgram.glProgram, 'u_translation');
    this.gl.uniform4fv(translationUniformLoc, translationArray);

    this.centerObject.draw();
  }

  drawOrbitingObject() {
    const { gl } = this;

    gl.useProgram(this.orbitProgram.glProgram);

    const colorArray = [this.forGround2.r, this.forGround2.g, this.forGround2.b, 1.0];
    const colorUniformLoc = gl.getUniformLocation(this.orbitProgram.glProgram, 'u_color');
    this.gl.uniform4fv(colorUniformLoc, colorArray);

    const radiusFloat = this.radius;
    const radiusUniformLoc = gl.getUniformLocation(this.orbitProgram.glProgram, 'u_radius');
    this.gl.uniform1f(radiusUniformLoc, radiusFloat);

    const rotationsPerSecond = 0.15;
    const timeFlaot = ((new Date() - this.initTime) / 1000) * (Math.PI * 2) * rotationsPerSecond;
    const timeUniformLoc = gl.getUniformLocation(this.orbitProgram.glProgram, 'u_time');
    this.gl.uniform1f(timeUniformLoc, timeFlaot);

    this.oribitingObject.draw();
  }

  draw() {
    this.drawCenterObject();
    this.drawOrbitingObject();
  }
}

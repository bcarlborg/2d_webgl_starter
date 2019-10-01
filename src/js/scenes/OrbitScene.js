import Shader from '../Shader.js';
import Program from '../Program.js';
// import IdleVertexShader from '../shaders/IdleVertexShader.js';
import TranslateShader from '../shaders/TranslateShader.js';
import OrbitingVertexShader from '../shaders/OrbitingVertexShader.js';
import SolidFragmentShader from '../shaders/SolidFragmentShader.js';
import CircleGeometry from '../geometries/CircleGeometry.js';
import SpokesGeometry from '../geometries/SpokesGeometry.js';
import mathWrapper from '../helpers/mathWrapper.js';
import matrixHelpers from '../helpers/matrixHelpers.js';
import MyColors from '../helpers/MyColors.js';

export default class OribitScene {
  constructor(gl) {
    this.gl = gl;
    this.centerObject = new SpokesGeometry(gl);
    this.oribitingObject = new CircleGeometry(gl);
    this.radius = 0.5;

    this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, TranslateShader);
    this.fsSolidCenter = new Shader(gl, gl.FRAGMENT_SHADER, SolidFragmentShader);
    this.solidProgram = new Program(gl, this.vsIdle, this.fsSolidCenter);

    this.vsOrbiting = new Shader(gl, gl.VERTEX_SHADER, OrbitingVertexShader);
    this.fsSolidOrbit = new Shader(gl, gl.FRAGMENT_SHADER, SolidFragmentShader);
    this.orbitProgram = new Program(gl, this.vsOrbiting, this.fsSolidOrbit);

    this.forGround = MyColors.getRandomColor('400');
    this.forGround2 = MyColors.getRandomColor('400');

    this.initTime = new Date();

    const identiyMatrix = mathWrapper.identity(4);
    const scaledMatrix = matrixHelpers.scale(identiyMatrix, 1.0, 2.0, 1.0);
    const flattenedOrbital = matrixHelpers.flatten(scaledMatrix);
    this.orbitalTransformationArray = flattenedOrbital;

    // 3. get whole orbit to be translateable
    // 4. get one object rotating at radius
    // 5. get orbits to orbit
  }

  drawCenterObject() {
    const { gl } = this;
    const program = this.solidProgram;
    gl.useProgram(program.glProgram);

    const colorArray = [this.forGround.r, this.forGround.g, this.forGround.b, 1.0];
    const colorUniformLoc = gl.getUniformLocation(program.glProgram, 'u_color');
    this.gl.uniform4fv(colorUniformLoc, colorArray);

    const rotationFloat = (Math.PI / 4);
    const rotationUniformLoc = gl.getUniformLocation(program.glProgram, 'u_rotationRadians');
    this.gl.uniform1f(rotationUniformLoc, rotationFloat);

    const transformationUniformArray = new Float32Array(this.orbitalTransformationArray);
    const transformationUniformLoc = gl.getUniformLocation(program.glProgram, 'u_transformation');
    this.gl.uniformMatrix4fv(transformationUniformLoc, false, transformationUniformArray);

    const scaleArray = [0.5, 0.5, 1.0, 1.0];
    const scaleUniformLoc = gl.getUniformLocation(program.glProgram, 'u_scale');
    this.gl.uniform4fv(scaleUniformLoc, scaleArray);

    const translationArray = [0.0, 0.0, 0.0, 0.0];
    const translationUniformLoc = gl.getUniformLocation(program.glProgram, 'u_translation');
    this.gl.uniform4fv(translationUniformLoc, translationArray);

    const screenRatio = (gl.canvas.clientWidth * 1.0) / gl.canvas.clientHeight;
    const ratioUniformLoc = gl.getUniformLocation(program.glProgram, 'u_screenRatio');
    this.gl.uniform1f(ratioUniformLoc, screenRatio);

    this.centerObject.draw();
  }

  drawOrbitingObject() {
    const { gl } = this;

    const program = this.orbitProgram;
    gl.useProgram(this.orbitProgram.glProgram);

    const colorArray = [this.forGround2.r, this.forGround2.g, this.forGround2.b, 1.0];
    const colorUniformLoc = gl.getUniformLocation(program.glProgram, 'u_color');
    this.gl.uniform4fv(colorUniformLoc, colorArray);

    const radiusFloat = this.radius;
    const radiusUniformLoc = gl.getUniformLocation(program.glProgram, 'u_radius');
    this.gl.uniform1f(radiusUniformLoc, radiusFloat);

    const rotationsPerSecond = 0.15;
    const timeFlaot = ((new Date() - this.initTime) / 1000) * (Math.PI * 2) * rotationsPerSecond;
    const timeUniformLoc = gl.getUniformLocation(program.glProgram, 'u_time');
    this.gl.uniform1f(timeUniformLoc, timeFlaot);

    const scaleArray = [0.5, 0.5, 1.0, 1.0];
    const scaleUniformLoc = gl.getUniformLocation(program.glProgram, 'u_scale');
    this.gl.uniform4fv(scaleUniformLoc, scaleArray);

    const screenRatio = (gl.canvas.clientWidth * 1.0) / gl.canvas.clientHeight;
    const ratioUniformLoc = gl.getUniformLocation(program.glProgram, 'u_screenRatio');
    this.gl.uniform1f(ratioUniformLoc, screenRatio);

    this.oribitingObject.draw();
  }

  draw() {
    this.drawCenterObject();
    this.drawOrbitingObject();
  }
}

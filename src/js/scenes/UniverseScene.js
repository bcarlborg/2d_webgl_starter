import Shader from '../Shader.js';
import Program from '../Program.js';
// import IdleVertexShader from '../shaders/IdleVertexShader.js';
import TranslateShader from '../shaders/TranslateShader.js';
import SolidFragmentShader from '../shaders/SolidFragmentShader.js';
// import CircleGeometry from '../geometries/CircleGeometry.js';
import SpokesGeometry from '../geometries/SpokesGeometry.js';
import MyColors from '../helpers/MyColors.js';

export default class UniverseScene {
  constructor(gl) {
    this.gl = gl;
    // this.centerCircle = new CircleGeometry(gl);
    this.centerSpokes = new SpokesGeometry(gl);

    this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, TranslateShader);
    this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, SolidFragmentShader);
    this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);

    this.forGround = MyColors.getRandomColor('400');
  }

  draw() {
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

    const translationArray = [0.2, 0.2, 0.0, 0.0];
    const translationUniformLoc = gl.getUniformLocation(this.solidProgram.glProgram, 'u_translation');
    this.gl.uniform4fv(translationUniformLoc, translationArray);


    this.centerSpokes.draw();
  }
}
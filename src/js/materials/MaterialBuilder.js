'use strict';

import Shader from '../Shader.js';
import MyColors from '../helpers/MyColors.js';
import Material from '../Material.js';
import Program from '../Program.js';

export default class MaterialBuilder {
  constructor(gl) {
    this.gl = gl;
    this.programs = [];
    this.materials = {};

    this.compileShaders();
  }

  compileShaders() {
    this.vsIdle = new Shader(this.gl, this.gl.VERTEX_SHADER, 'idle-vs.glsl');
    this.fsStriped = new Shader(this.gl, this.gl.FRAGMENT_SHADER, 'striped-fs.glsl');
  }

  buildStripedMaterial() {
    const stripedProgram = new Program(this.gl, this.vsIdle, this.fsStriped);
    this.programs.push(stripedProgram);

    const stripedMaterial = new Material(this.gl, stripedProgram);

    const randomColor = MyColors.getRandomColor('400');
    stripedMaterial.solidColor.set(...randomColor, 1.0);
    stripedMaterial.stripeWidth.set(0.8, 0);
    this.materials.stripedMaterial = stripedMaterial;
  }
}

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
    this.fsSolid = new Shader(this.gl, this.gl.FRAGMENT_SHADER, 'striped-fs.glsl');
    this.fsGrid = new Shader(this.gl, this.gl.FRAGMENT_SHADER, 'grid-fs.glsl');
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

  buildSolidMaterial() {
    const solidProgram = new Program(this.gl, this.vsIdle, this.fsSolid);
    this.programs.push(solidProgram);

    const solidMaterial = new Material(this.gl, solidProgram);

    const randomColor = MyColors.getRandomColor('400');
    solidMaterial.solidColor.set(...randomColor, 1.0);
    this.materials.solidMaterial = solidMaterial;
  }

  buildGridMaterial() {
    const gridProgram = new Program(this.gl, this.vsIdle, this.fsGrid);
    this.programs.push(gridProgram);

    const gridMaterial = new Material(this.gl, gridProgram);

    const randomColor1 = MyColors.getRandomColor('200');
    const randomColor2 = MyColors.getRandomColor('800');
    this.gridMaterial.solidColor.set(...randomColor1, 1.0);
    this.gridMaterial.stripeColor.set(...randomColor2, 1.0);
    this.materials.gridMaterial = gridMaterial;
  }
}

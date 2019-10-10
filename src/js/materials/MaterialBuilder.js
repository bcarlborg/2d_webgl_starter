'use strict';

import Shader from '../Shader.js';
import MyColors from '../helpers/MyColors.js';
import Material from '../Material.js';
import Program from '../Program.js';

export default class MaterialBuilder {
  constructor(gl) {
    this.gl = gl;
    this.namedPrograms = {};
    this.shaderNames = {};
    this.compileShaders();
  }

  compileShaders() {
    const { shaderNames } = this;

    this.vsIdle = new Shader(this.gl, this.gl.VERTEX_SHADER, 'idle-vs.glsl');
    shaderNames.idle = 'vsIdle';

    this.fsStriped = new Shader(this.gl, this.gl.FRAGMENT_SHADER, 'striped-fs.glsl');
    shaderNames.striped = 'fsStriped';

    this.fsSolid = new Shader(this.gl, this.gl.FRAGMENT_SHADER, 'striped-fs.glsl');
    shaderNames.solid = 'fsSolid';

    this.fsGrid = new Shader(this.gl, this.gl.FRAGMENT_SHADER, 'grid-fs.glsl');
    shaderNames.grid = 'fsGrid';
  }

  buildStripedMaterial(forgroundColorWeight, stripeWidth) {
    const stripeProgram = this.buildProgram(this.shaderNames.idle, this.shaderNames.striped);
    const stripeMaterial = new Material(this.gl, stripeProgram);

    const forgroundColor = MyColors.getRandomColor(forgroundColorWeight);
    stripeMaterial.solidColor.set(...forgroundColor, 1.0);
    stripeMaterial.stripeWidth.set(stripeWidth, 0);

    return stripeMaterial;
  }

  buildGridMaterial(forgroundColorWeight, backgroundColorWeight) {
    const gridProgram = this.buildProgram(this.shaderNames.idle, this.shaderNames.grid);
    const gridMaterial = new Material(this.gl, gridProgram);

    const backgroundColor = MyColors.getRandomColor(forgroundColorWeight);
    const forgroundColor = MyColors.getRandomColor(backgroundColorWeight);

    gridMaterial.solidColor.set(...forgroundColor, 1.0);
    gridMaterial.stripeColor.set(...backgroundColor, 1.0);

    return gridMaterial;
  }

  buildSolidMaterial(colorWeight) {
    const solidProgram = this.buildProgram(this.shaderNames.idle, this.shaderNames.solid);
    const solidMaterial = new Material(this.gl, solidProgram);

    const randomColor = MyColors.getRandomColor(colorWeight);
    solidMaterial.solidColor.set(...randomColor, 1.0);
    return solidMaterial;
  }

  buildProgram(vsType, fsType) {
    const progName = `${vsType}-${fsType}`;

    let vsShader = null;
    let fsShader = null;

    if (this.namedPrograms[progName]) {
      return this.namedPrograms[progName];
    }

    const { shaderNames } = this;

    if (vsType === shaderNames.idle) {
      vsShader = this.vsIdle;
    }

    if (fsType === shaderNames.solid) {
      fsShader = this.fsSolid;
    } else if (fsType === shaderNames.grid) {
      fsShader = this.fsGrid;
    } else if (fsType === shaderNames.striped) {
      fsShader = this.fsStriped;
    }

    this.namedPrograms[progName] = new Program(this.gl, vsShader, fsShader);
    return this.namedPrograms[progName];
  }

  getActivePrograms() {
    return Object.values(this.namedPrograms);
  }
}

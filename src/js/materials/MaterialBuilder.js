'use strict';

import Shader from '../Shader.js';
import MyColors from '../helpers/MyColors.js';
import Material from './Material.js';
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

  buildStripedMaterial(forgroundName, forgroundWeight, stripeWidth) {
    const forgroundColor = MyColors.getColor(forgroundName, forgroundWeight);
    return this.constructStripedMaterial(forgroundColor, stripeWidth);
  }

  buildRandomStripedMaterial(forgroundColorWeight, stripeWidth) {
    const forgroundColor = MyColors.getRandomColor(forgroundColorWeight);
    return this.constructStripedMaterial(forgroundColor, stripeWidth);
  }

  constructStripedMaterial(color, stripeWidth) {
    const stripeProgram = this.buildProgram(this.shaderNames.idle, this.shaderNames.striped);
    const stripeMaterial = new Material(this.gl, stripeProgram);
    stripeMaterial.solidColor.set(...color, 1.0);
    stripeMaterial.stripeWidth.set(stripeWidth, 0);
    return stripeMaterial;
  }

  buildRandomGridMaterial(forgroundWeight, backgroundWeight) {
    const backgroundColor = MyColors.getRandomColor(forgroundWeight);
    const forgroundColor = MyColors.getRandomColor(backgroundWeight);
    const gridMaterial = this.constructGridMaterial(forgroundColor, backgroundColor);
    return gridMaterial;
  }

  buildGridMaterial(forgroundName, forgroundWeight, backgroundName, backgroundWeight) {
    const backgroundColor = MyColors.getColor(forgroundName, forgroundWeight);
    const forgroundColor = MyColors.getColor(backgroundName, backgroundWeight);
    const gridMaterial = this.constructGridMaterial(forgroundColor, backgroundColor);
    return gridMaterial;
  }

  constructGridMaterial(forgroundColor, backgroundColor) {
    const gridProgram = this.buildProgram(this.shaderNames.idle, this.shaderNames.grid);
    const gridMaterial = new Material(this.gl, gridProgram);
    gridMaterial.solidColor.set(...forgroundColor, 1.0);
    gridMaterial.stripeColor.set(...backgroundColor, 1.0);

    return gridMaterial;
  }

  buildRandomSolidMaterial(colorWeight) {
    const randomColor = MyColors.getRandomColor(colorWeight);
    return this.constructSolidMaterial(randomColor);
  }

  buildSolidMaterial(colorName, colorWeight) {
    const color = MyColors.getColor(colorName, colorWeight);
    return this.constructSolidMaterial(color);
  }

  constructSolidMaterial(color) {
    const solidProgram = this.buildProgram(this.shaderNames.idle, this.shaderNames.solid);
    const solidMaterial = new Material(this.gl, solidProgram);
    solidMaterial.solidColor.set(...color, 1.0);
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

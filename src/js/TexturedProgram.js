'use strict';

import wglm from './helpers/WebGLMath.js';
/* exported Program */
export default class TexturedProgram extends wglm.UniformProvider {
  constructor(gl, vertexShader, fragmentShader) {
    super('program');
    this.gl = gl;
    this.sourceFileNames = {
      vs: vertexShader.sourceFileName,
      fs: fragmentShader.sourceFileName,
    };
    this.glProgram = gl.createProgram();
    gl.attachShader(this.glProgram, vertexShader.glShader);
    gl.attachShader(this.glProgram, fragmentShader.glShader);

    gl.bindAttribLocation(this.glProgram, 0, 'vertexPosition');
    gl.bindAttribLocation(this.glProgram, 1, 'vertexTexCoord');

    gl.linkProgram(this.glProgram);
    if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
      throw new Error(`Could not link shaders [vertex shader: ${
        vertexShader.sourceFileName
      }]:[fragment shader: ${fragmentShader.sourceFileName}
       ${gl.getProgramInfoLog(this.glProgram)}`);
    }

    this.addComponentsAndGatherUniforms(
      new wglm.ProgramReflection(gl, this.glProgram),
    );
  }
}
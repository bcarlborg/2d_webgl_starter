'use strict';

export default class CircleGeomety {
  constructor(gl) {
    this.gl = gl;
    this.vertices = [];

    for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
      this.vertices.push(0, 0, 0);
      this.vertices.push(Math.cos(angle), Math.sin(angle), 0);
      this.vertices.push(Math.cos(angle + 0.1), Math.sin(angle + 0.1), 0);
    }
    this.indices = [];
    for (let i = 0; i < this.vertices.length / 3; i += 1) {
      this.indices.push(i);
    }
    this.colorVertex = [];
    for (let i = 0; i < this.vertices.length; i += 3) {
      this.colorVertex.push(0, 0, 1);
    }

    console.log(this.indices, this.vertices);

    // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.vertices),
      gl.STATIC_DRAW,
    );

    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.colorVertex),
      gl.STATIC_DRAW,
    );

    // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.indices),
      gl.STATIC_DRAW,
    );

    // create and bind input layout with input buffer bindings (OpenGL name: vertex array)
    this.inputLayout = gl.createVertexArray();
    gl.bindVertexArray(this.inputLayout);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(
      0,
      3,
      gl.FLOAT, // < three pieces of float
      false, // < do not normalize (make unit length)
      0, // < tightly packed
      0, // < data starts at array start
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(
      1,
      3,
      gl.FLOAT, // < three pieces of float
      false, // < do not normalize (make unit length)
      0, // < tightly packed
      0, // < data starts at array start
    );

    gl.bindVertexArray(null);
  }

  draw() {
    const { gl } = this;

    gl.bindVertexArray(this.inputLayout);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
  }
}

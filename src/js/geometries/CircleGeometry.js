/* exported TriangleGeometry */
export default class CircleGeometry {
  constructor(gl) {
    this.gl = gl;
    this.vertices = [];
    this.indices = [];
    this.vertexDataForm = [];

    this.generateBufferArrays();
    this.bindArraysToAttributes();
  }

  generateBufferArrays() {
    this.vertices = new Float32Array([
      -0.2, -0.2, 0.2,
      -0.2, 0.2, 0.2,
      0.2, 0.0, 0.2,
    ]);

    this.indices = new Uint16Array([0, 1, 2]);
    this.vertexDataForm = [
      0,
      3, this.gl.FLOAT, // < three pieces of float
      false, // < do not normalize (make unit length)
      0, // < tightly packed
      0, // < data starts at array start
    ];
  }

  bindArraysToAttributes() {
    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER,
      this.vertices,
      this.gl.STATIC_DRAW);

    // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
    this.indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,
      this.indices,
      this.gl.STATIC_DRAW);

    // create and bind input layout with input buffer bindings (OpenGL name: vertex array)
    this.inputLayout = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.inputLayout);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.enableVertexAttribArray(0);
    this.gl.vertexAttribPointer(...this.vertexDataForm);
    this.gl.bindVertexArray(null);

    this.gl.bindVertexArray(null);
  }

  draw() {
    const { gl } = this;

    gl.bindVertexArray(this.inputLayout);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
  }
}

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
    const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

    const angleResolution = 360;
    const angleStep = 360.0 / angleResolution;
    const radius = 0.15;

    for (let i = 0; i < 360; i += angleStep) {
      const radiansFirst = degreesToRadians(i);
      const radiansSecond = degreesToRadians(i + angleStep);
      this.vertices.push(0.0, 0.0, 0.0);
      this.vertices.push(radius * Math.cos(radiansFirst), radius * Math.sin(radiansFirst), 0.0);
      this.vertices.push(radius * Math.cos(radiansSecond), radius * Math.sin(radiansSecond), 0.0);
    }

    const numberOfVertices = this.vertices.length / 3;
    for (let i = 0; i < numberOfVertices; i += 3) {
      this.indices.push(i, i + 1, i + 2);
    }

    this.vertices = new Float32Array(this.vertices);
    this.indices = new Uint16Array(this.indices);

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

    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
  }
}

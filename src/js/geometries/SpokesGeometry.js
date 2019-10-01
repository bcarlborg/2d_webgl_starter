/* exported TriangleGeometry */
export default class SpokesGeometry {
  constructor(gl) {
    this.gl = gl;
    this.vertices = [];
    this.indices = [];
    this.vertexDataForm = [];

    this.generateBufferArrays();
    this.bindArraysToAttributes();
  }

  generateBufferArrays() {
    // const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

    const numberOfSpokes = 2;
    const angleStep = (Math.PI * 2) / numberOfSpokes;

    const width = 0.05;
    const hyp = 0.5

    for (let i = 0; i < numberOfSpokes; i += 1) {
      const step = angleStep * i;
    
      const angleA = step;
      const angleB = Math.acos(width / hyp) + step;
      const angleC = (Math.PI - angleB) + step;
      const angleD = Math.PI + step;

      const origin = {
        x: 0.0,
        y: 0.0,
        z: 0.0,
        w: 0.0,
      };

      const lowerRight = {
        x: width * Math.cos(angleA),
        y: width * Math.sin(angleA),
        z: 0.0,
        w: 0.0,
      };

      const upperRight = {
        x: hyp * Math.cos(angleB),
        y: hyp * Math.sin(angleB),
        z: 0.0,
        w: 0.0,
      };

      const upperLeft = {
        x: hyp * Math.cos(angleC),
        y: hyp * Math.sin(angleC),
        z: 0.0,
        w: 0.0,
      };

      const lowerLeft = {
        x: width * Math.cos(angleD),
        y: width * Math.sin(angleD),
        z: 0.0,
        w: 0.0,
      };

      const indexBase = i * 8;
      this.vertices.push(
        origin.x, origin.y, origin.z,
        lowerRight.x, lowerRight.y, lowerRight.z,
        upperRight.x, upperRight.y, upperRight.z,
      );
      this.indices.push(indexBase, indexBase + 1, indexBase + 2);


      this.vertices.push(
        origin.x, origin.y, origin.z,
        upperRight.x, upperRight.y, upperRight.z,
        upperLeft.x, upperLeft.y, upperLeft.z,
      );
      this.indices.push(indexBase + 3, indexBase + 4, indexBase + 5);


      this.vertices.push(
        origin.x, origin.y, origin.z,
        upperLeft.x, upperLeft.y, upperLeft.z,
        lowerLeft.x, lowerLeft.y, lowerLeft.z,
      );
      this.indices.push(indexBase + 6, indexBase + 7, indexBase + 8);
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

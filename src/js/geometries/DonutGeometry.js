// eslint-disable-next-line no-unused-vars
export default class DonutGeometry {
  constructor(gl, innerScalar = 0.98) {
    this.gl = gl;

    // resolution variable determines how many triangle blocks will be used
    // when rendering the donut. Higher resolution means better looking donut.
    // If the resolution is 360, the donut will be built from one rectangle for
    // every one degree of rotation in the donut
    this.vertexArray = [];
    this.indexArray = [];

    const resolution = 360;
    const delta = 360 / resolution;
    for (let i = 0; i < 360; i += delta) {
      const preAngle = (i * Math.PI) / 180;
      const postAngle = ((i + delta) * Math.PI) / 180;

      const preInnerCoord = {
        x: Math.cos(preAngle) * innerScalar,
        y: Math.sin(preAngle) * innerScalar,
        index: (this.vertexArray.length / 3),
      };

      const preOuterCoord = {
        x: Math.cos(preAngle),
        y: Math.sin(preAngle),
        index: preInnerCoord.index + 1,
      };

      const postInnerCoord = {
        x: Math.cos(postAngle) * innerScalar,
        y: Math.sin(postAngle) * innerScalar,
        index: preOuterCoord.index + 1,
      };

      const postOuterCoord = {
        x: Math.cos(postAngle),
        y: Math.sin(postAngle),
        index: postInnerCoord.index + 1,
      };

      this.vertexArray.push(
        preInnerCoord.x, preInnerCoord.y, 0.0,
        preOuterCoord.x, preOuterCoord.y, 0.0,
        postInnerCoord.x, postInnerCoord.y, 0.0,
        postOuterCoord.x, postOuterCoord.y, 0.0,
      );

      this.indexArray.push(
        preOuterCoord.index, postOuterCoord.index, preInnerCoord.index,
        postOuterCoord.index, postInnerCoord.index, preInnerCoord.index,
      );
    }
    this.colorVertexArray = [];
    for (let i = 0; i < this.vertexArray.length; i += 3) {
      this.colorVertexArray.push(0, 0, 1);
    }

    // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.vertexArray),
      gl.STATIC_DRAW,
    );

    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.colorVertexArray),
      gl.STATIC_DRAW,
    );

    // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.indexArray),
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

    gl.drawElements(gl.TRIANGLES, this.indexArray.length, gl.UNSIGNED_SHORT, 0);
  }
}

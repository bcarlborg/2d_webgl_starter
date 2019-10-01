const TranslateShader = (() => {
  const name = 'IdleVertexShader';
  const source = `#version 300 es
    in vec4 vertexPosition;

    uniform float u_rotationRadians;
    uniform vec4 u_scale;
    uniform vec4 u_translation;

    void main(void) {
      mat4 rotationTranformation = mat4(
        cos(u_rotationRadians), -1.0 * sin(u_rotationRadians), 0.0, 0.0,
        sin(u_rotationRadians), cos(u_rotationRadians), 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 1.0);

      mat4 scaleTransformation = mat4(
        u_scale[0], 0.0, 0.0, 0.0,
        0.0, u_scale[1], 0.0, 0.0,
        0.0, 0.0, u_scale[2], 0.0,
        0.0, 0.0, 0.0, 1.0);

      vec4 rotated = rotationTranformation * vertexPosition;
      vec4 scaled = scaleTransformation * rotated;
      vec4 translated = u_translation + scaled;
      gl_Position = translated;
    }
  `;

  return {
    name,
    source,
  };
})();

export default TranslateShader;

const TranslateShader = (() => {
  const name = 'IdleVertexShader';
  const source = `#version 300 es
    in vec4 vertexPosition;

    uniform float u_rotationRadians;

    void main(void) {
      mat4 tranformation = mat4(
        cos(u_rotationRadians), -1.0 * sin(u_rotationRadians), 0.0, 0.0,
        sin(u_rotationRadians), cos(u_rotationRadians), 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 1.0);
      vec4 translatedPosition = tranformation * vertexPosition;
      gl_Position = translatedPosition;
    }
  `;

  return {
    name,
    source,
  };
})();

export default TranslateShader;

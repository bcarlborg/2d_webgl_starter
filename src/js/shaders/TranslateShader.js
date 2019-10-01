const TranslateShader = (() => {
  const name = 'TranslateShader';
  const source = `#version 300 es
    in vec4 vertexPosition;

    uniform float u_rotationRadians;
    uniform float u_screenRatio;
    uniform vec4 u_scale;
    uniform vec4 u_translation;

    uniform mat4 u_transformation;

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

      mat4 scaleScreen = mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, u_screenRatio, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);

      vec4 rotated = rotationTranformation * vertexPosition;
      vec4 scaled = scaleTransformation * rotated;
      vec4 screenScaled = scaleScreen * scaled;
      vec4 translated = u_translation + screenScaled;
      // gl_Position = translated;

      vec4 translatedPrime = u_transformation * vertexPosition;
      gl_Position = translatedPrime;
    }
  `;

  return {
    name,
    source,
  };
})();

export default TranslateShader;

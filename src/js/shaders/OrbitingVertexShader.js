const OrbitingVertexShader = (() => {
  const name = 'OrbitingVertexShader';
  const source = `#version 300 es
    in vec4 vertexPosition;

    uniform float u_time;
    uniform float u_radius;
    uniform vec4 u_scale;
    uniform float u_screenRatio;


    void main(void) {

      mat4 scaleScreen = mat4(
        1.0, 0.0, 0.0, 0.0,
        0.0, u_screenRatio, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);

      mat4 scaleTransformation = mat4(
        u_scale[0], 0.0, 0.0, 0.0,
        0.0, u_scale[1], 0.0, 0.0,
        0.0, 0.0, u_scale[2], 0.0,
        0.0, 0.0, 0.0, 1.0);

      vec4 scaledVertex = scaleTransformation * vertexPosition;
      scaledVertex = scaleScreen * scaledVertex;

      vec4 translation = vec4(u_radius * cos(u_time), u_radius * sin(u_time), 0.0, 0.0);
      translation = scaleScreen * translation;
      vec4 translated = translation + scaledVertex;

      gl_Position = translated;
    }
  `;

  return {
    name,
    source,
  };
})();

export default OrbitingVertexShader;

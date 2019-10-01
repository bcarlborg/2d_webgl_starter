const OrbitingVertexShader = (() => {
  const name = 'OrbitingVertexShader';
  const source = `#version 300 es
    in vec4 vertexPosition;

    uniform float u_time;
    uniform float u_radius;


    void main(void) {
      vec4 translation = vec4(u_radius * cos(u_time), u_radius * sin(u_time), 0.0, 0.0);
      vec4 translated = translation + vertexPosition;
      gl_Position = translated;
    }
  `;

  return {
    name,
    source,
  };
})();

export default OrbitingVertexShader;

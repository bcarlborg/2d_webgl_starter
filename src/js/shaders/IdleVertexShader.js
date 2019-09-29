const IdleVertexShader = (() => {
  const name = 'IdleVertexShader';
  const source = `#version 300 es
    in vec4 vertexPosition;

    void main(void) {
      gl_Position = vertexPosition;
    }
  `;

  return {
    name,
    source,
  };
})();

export default IdleVertexShader;

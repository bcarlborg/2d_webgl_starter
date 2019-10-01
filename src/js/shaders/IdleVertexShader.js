const IdleVertexShader = (() => {
  const name = 'IdleVertexShader';
  const source = `#version 300 es
    in vec4 vertexPosition;
    uniform vec4 u_translation;

    void main(void) {
      vec4 translatedPosition = vertexPosition + u_translation;
      gl_Position = translatedPosition;
    }
  `;

  return {
    name,
    source,
  };
})();

export default IdleVertexShader;

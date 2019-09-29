const SolidFragmentShader = (() => {
  const name = 'SolidFragmentShader';
  const source = `#version 300 es
    precision highp float;
    uniform vec4 u_color;
    out vec4 fragmentColor;

    void main(void) {
      fragmentColor = u_color; 
    }
  `;
  return {
    name,
    source,
  };
})();

export default SolidFragmentShader;

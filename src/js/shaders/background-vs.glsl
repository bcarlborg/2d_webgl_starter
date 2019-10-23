ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  in vec4 vertexPosition;
  in vec4 vertexTexCoord;

  uniform struct {
  	mat4 viewProjMatrixInverse;
  } camera;
  out vec2 texCoord;

  void main(void) {
    gl_Position = vertexPosition;
    vec4 intermediate = vec4(1.0, 1.0, 1.0, 1.0);
    intermediate = (vertexPosition * camera.viewProjMatrixInverse);
    intermediate.xy *= 0.75;
    texCoord.x = intermediate.x;
    texCoord.y = intermediate.y;
  }
`;

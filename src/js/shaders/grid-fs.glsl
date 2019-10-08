ShaderSource.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;

  out vec4 fragmentColor;
  in vec4 color;
  in vec4 modelPosition;

  uniform struct{
  	vec4 solidColor;
    vec4 stripeColor;
  } material;

  float when_eq(float x, float y) {
    return 1.0 - abs(sign(x - y));
  }

  float modulo(float x, float y) {
    return x - (y * floor(x/y));
  }

  void main(void) {
    float xScaled = modelPosition.x * 100.0;
    float yScaled = modelPosition.y * 100.0;

    float isXNotLine = step(1.0, modulo(xScaled, 10.0));
    float isYNotLine = step(1.0, modulo(yScaled, 10.0));

    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    color += material.solidColor * when_eq(isXNotLine, 1.0) * when_eq(isYNotLine, 1.0);
    color += material.stripeColor * when_eq(isXNotLine, 0.0) * when_eq(isYNotLine, 0.0);

    fragmentColor = color;
  }
`;

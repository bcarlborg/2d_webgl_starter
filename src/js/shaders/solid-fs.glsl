import Sahder from '../Shader.js';
Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;
  uniform vec4 u_color;
  out vec4 fragmentColor;

  void main(void) {
    fragmentColor = u_color; 
  }
`;

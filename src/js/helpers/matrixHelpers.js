import mathWrapper from './mathWrapper.js';

const matrixHelpers = (() => (
  {
    flatten: (matrix) => {
      const flat = [];
      matrix.forEach((value) => {
        flat.push(value);
      });
      return flat;
    },

    scale: (matrix, x, y, z) => {
      const scaleMatrix = mathWrapper.matrix([
        [x, 0.0, 0.0, 0.0],
        [0.0, y, 0.0, 0.0],
        [0.0, 0.0, z, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ]);
      return mathWrapper.multiply(matrix, scaleMatrix);
    },

    rotate: (matrix, theta) => {
      const rotateMatrix = mathWrapper.matrix([
        [Math.cos(theta), -1.0 * Math.sin(theta), 0.0, 0.0],
        [Math.sin(theta), Math.cos(theta), 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ]);
      return mathWrapper.multiply(matrix, rotateMatrix);
    },
  }
))();
export default matrixHelpers;

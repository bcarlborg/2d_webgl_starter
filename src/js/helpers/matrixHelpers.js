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
  }
))();
export default matrixHelpers;

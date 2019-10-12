'use strict';

import GameTime from '../GameTime.js';

const matrixHelpers = (() => {
  const gameTime = new GameTime();

  return {
    rotatePerSecond: (matrix, rotatePerSecond) => {
      const radiansPerSecond = rotatePerSecond * 2;
      const radianDelta = radiansPerSecond * gameTime.dtSeconds;
      matrix.rotate(radianDelta);
    },
  };
})();

export default matrixHelpers;

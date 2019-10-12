'use strict';

import wglm from './helpers/WebGLMath.js';

export default class BoundingBox {
  constructor(scale) {
    this.scale = 1;
    if (scale) this.scale = scale;

    this.initialPoints = {};
    this.transformedPoints = {};

    this.initPoints();

    const thePoint = { x: 0.5, y: 0.7 };
    const doesIntersect = this.doesPointIntersec(thePoint);
    console.log(doesIntersect);
  }

  initPoints() {
    const points = this.initialPoints;
    points.topLeft = new wglm.Vec3(-1 * this.scale, 1 * this.scale, 0 * this.scale);
    points.topRight = new wglm.Vec3(1 * this.scale, 1 * this.scale, 0 * this.scale);
    points.bottomLeft = new wglm.Vec3(-1 * this.scale, -1 * this.scale, 0 * this.scale);
    points.bottomRight = new wglm.Vec3(1 * this.scale, -1 * this.scale, 0 * this.scale);
    this.transformedPoints = { ...points };
  }

  doesPointIntersec(point) {
    const vs = Object.values(this.transformedPoints);
    const { x, y } = point;

    let inside = false;

    // eslint-disable-next-line no-plusplus
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][x];
      const yi = vs[i][y];
      const xj = vs[j][x];
      const yj = vs[j][y];

      const intersect = ((yi > y) !== (yj > y))
        && ((x < (xj - xi) * (y - yi)) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  transformPoints(matrix) {
    let transformedPoints = this;
    transformedPoints = { ...this.initialPoints };

    const positionKeys = Object.keys(this.initialPoints);
    positionKeys.forEach((position) => {
      transformedPoints[position].xyz1mul(matrix);
    });
  }
}

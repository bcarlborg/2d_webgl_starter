'use strict';

import wglm from './helpers/WebGLMath.js';
import isInside from './helpers/inside.js';

export default class BoundingBox {
  constructor(scale) {
    this.scale = 1;
    if (scale) this.scale = scale;

    this.initialPoints = {};
    this.transformedPoints = {};

    this.initPoints();
  }

  initPoints() {
    const points = this.initialPoints;
    points.topLeft = new wglm.Vec3(-1 * this.scale, 1 * this.scale, 0 * this.scale);
    points.topRight = new wglm.Vec3(1 * this.scale, 1 * this.scale, 0 * this.scale);
    points.bottomLeft = new wglm.Vec3(-1 * this.scale, -1 * this.scale, 0 * this.scale);
    points.bottomRight = new wglm.Vec3(1 * this.scale, -1 * this.scale, 0 * this.scale);
    this.resetTransformedPoints();
  }

  doesPointIntersect(point) {
    let vs = Object.values(this.transformedPoints);
    vs = vs.map((p) => (
      [p.x, p.y]
    ));

    const pointArr = [point.x, point.y];
    return isInside(vs, pointArr);
  }

  transformPoints(matrix) {
    const { transformedPoints } = this;
    this.resetTransformedPoints();

    const positionKeys = Object.keys(this.initialPoints);
    positionKeys.forEach((position) => {
      transformedPoints[position].xyz1mul(matrix);
    });
  }

  resetTransformedPoints() {
    const positionKeys = Object.keys(this.initialPoints);
    positionKeys.forEach((position) => {
      this.transformedPoints[position] = this.initialPoints[position].clone();
    });
  }
}

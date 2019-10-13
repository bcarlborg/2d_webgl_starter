'use strict';

import wglm from './helpers/WebGLMath.js';

export default class BoundingBox {
  constructor(scale) {
    this.scale = 1;
    if (scale) this.scale = scale;

    this.initialPoints = {};
    this.transformedPoints = {};
    this.boundingRect = {
      x1: 0, y1: 0, x2: 0, y2: 0,
    };

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
    const pointRect = {
      x1: point.x,
      x2: point.x,
      y1: point.y,
      y2: point.y,
    };
    return 'foobar';
  }

  transformPoints(matrix) {
    const { transformedPoints } = this;
    this.resetTransformedPoints();

    const transformedX = [];
    const transformedY = [];

    const positionKeys = Object.keys(this.initialPoints);
    positionKeys.forEach((position) => {
      transformedPoints[position].xyz1mul(matrix);
      transformedX.push(transformedPoints[position].x);
      transformedY.push(transformedPoints[position].y);
    });

    const minX = Math.min(...transformedX);
    const maxX = Math.max(...transformedX);
    const minY = Math.min(...transformedY);
    const maxY = Math.max(...transformedY);

    this.boundingRect.x1 = minX;
    this.boundingRect.y1 = -1 * maxY;
    this.boundingRect.x2 = maxX;
    this.boundingRect.y2 = -1 * minY;
  }

  resetTransformedPoints() {
    const positionKeys = Object.keys(this.initialPoints);
    positionKeys.forEach((position) => {
      this.transformedPoints[position] = this.initialPoints[position].clone();
    });
  }
}

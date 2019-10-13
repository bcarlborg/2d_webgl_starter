'use strict';

import wglm from './helpers/WebGLMath.js';
import geo from './helpers/geo.js';

export default class BoundingBox {
  constructor(scale) {
    this.scale = 1;
    if (scale) this.scale = scale;
    this.orderedPositionKeys = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
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
    const pointArr = [point.x, point.y];
    const poly = [];
    this.orderedPositionKeys.forEach((position) => (
      poly.push([
        this.transformedPoints[position].x,
        this.transformedPoints[position].y,
      ])
    ));

    const isInPoly = geo.pointInPolygon(pointArr, poly);
    return isInPoly;
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

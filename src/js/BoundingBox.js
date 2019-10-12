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
    let vs = Object.values(this.transformedPoints);
    vs = vs.map((p) => (
      [p.x, p.y]
    ));

    const { x, y } = point;

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0];
      const yi = vs[i][1];
      const xj = vs[j][0];
      const yj = vs[j][1];

      const intersect = ((yi > y) !== (yj > y))
        && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
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

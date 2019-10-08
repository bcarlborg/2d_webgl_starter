'use strict';

const modulate = ({
  amplitude = 1.0, period = 1.0, offset = 0.0, x,
}) => (
  (amplitude * Math.sin(period * x)) + offset
);
export default modulate;

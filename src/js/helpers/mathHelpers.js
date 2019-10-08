'use strict';

const modulate = ({
  amp = 1.0, period = 1.0, offset = 0.0, x,
}) => (
  (amp * Math.sin(period * x)) + offset
);
export default modulate;

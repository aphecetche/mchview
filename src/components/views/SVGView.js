import React from "react";
import PropTypes from "prop-types";

const SVGView = ({ geo, classname, children, offset }) => {
  if (!geo) {
    return null;
  }
  let xleft = -(geo.x - geo.sx / 2.0);
  let ytop = -(geo.y - geo.sy / 2.0);

  const aspectRatio = (1.0 * geo.sy) / geo.sx;

  let w = "100%";
  let h = aspectRatio * 100 + "%";
  if (isFinite(h)) {
    return null;
  }
  let vx = geo.sx;
  let vy = geo.sy;

  let left = 0;
  let top = 0;
  if (offset) {
    left = -offset.left;
    top = -offset.top;
    vx += offset.left + offset.right;
    vy += offset.top + offset.bottom;
  }

  // vx *= 0.5;
  // vy *= 0.5;
  vx *= 1.2;
  vy *= 1.2;

  return (
    <svg width={w} height={h} viewBox={left + " " + top + " " + vx + " " + vy}>
      <g
        className={classname}
        transform={"translate(" + xleft + "," + ytop + ")"}
      >
        {children}
      </g>
    </svg>
  );
};

SVGView.propTypes = {
  geo: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    sx: PropTypes.number,
    sy: PropTypes.number
  }),
  classname: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  offset: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number
  })
};

export default SVGView;

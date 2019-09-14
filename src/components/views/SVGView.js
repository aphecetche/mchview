import React from "react";
import PropTypes from "prop-types";

const SVGView = ({ geo, classname, children }) => {
  if (!geo) {
    return null;
  }
  const xleft = -(geo.x - geo.sx / 2.0);
  const ybottom = -(geo.y - geo.sy / 2.0);

  const aspectRatio = (1.0 * geo.sy) / geo.sx;

  const w = "100%";
  const h = aspectRatio * 100 + "%";
  if (isFinite(h)) {
    return null;
  }
  // const vx = geo.sx + 10;
  // const vy = geo.sy + 10;
  const vx = geo.sx;
  const vy = geo.sy;

  return (
    <svg width={w} height={h} viewBox={"0 0 " + vx + " " + vy}>
      <g
        className={classname}
        transform={"translate(" + xleft + "," + ybottom + ")"}
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
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SVGView;

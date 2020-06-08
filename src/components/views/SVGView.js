import React from "react";
import PropTypes from "prop-types";

const SVGView = ({ geo, classname, children, offset, zoom }) => {
  if (!geo) {
    return null;
  }

  if (zoom == 0) {
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

  //xleft -= vx / 4;
  zoom = 0.95;

  // xleft /= zoom;
  // ytop /= zoom;

  let left = 0;
  let top = 0;
  // it seems there's no way in SVG to indicate that the stroke should be outside
  // so we put a ad-hoc offset to see the full border
  const visualOffset = null; //{ left: 5, top: 5, right: 5, bottom: 5 };

  if (visualOffset) {
    left += -visualOffset.left;
    top += -visualOffset.top;
    vx += visualOffset.left + visualOffset.right;
    vy += visualOffset.top + visualOffset.bottom;
  }

  //console.log(left, top, vx, vy);
  return (
    <svg
      id="mysvg"
      width={w}
      height={h}
      viewBox={left + " " + top + " " + vx + " " + vy}
      // onMouseMove={event => console.log(event.nativeEvent)}
    >
      <g
        className={classname}
        transform={"translate(" + xleft + "," + ytop + ") scale(" + zoom + ")"}
      >
        {children}
      </g>
      <circle style={{ fill: "red" }} cx={left} cy={top} r={2} />
      <circle style={{ fill: "green" }} cx={vx / 2} cy={vy / 2} r={2} />
      <circle style={{ fill: "blue" }} cx={left + vx} cy={top + vy} r={2} />
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
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  zoom: PropTypes.number
};

export default SVGView;

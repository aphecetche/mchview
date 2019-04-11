import React from "react";
import PropTypes from "prop-types";

const SVGView = ({ geo, classname, children }) => {
  const xleft = -(geo.X - geo.SX / 2.0);
  const ybottom = -(geo.Y - geo.SY / 2.0);

  const aspectRatio = (1.0 * geo.SY) / geo.SX;

  const w = "100%";
  const h = aspectRatio * 100 + "%";
  if (isFinite(h)) {
    return "";
  }
  const vx = geo.SX + 10;
  const vy = geo.SY + 10;

  return (
    <svg width={w} height={h} viewBox={"-5 -5 " + vx + " " + vy}>
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
  children: PropTypes.array
};

export default SVGView;
// const createSVG = (degeo, className) => {
//   const sx = degeo.SX;
//   const sy = degeo.SY;
//   const xleft = degeo.X - sx / 2.0;
//   const ybottom = degeo.Y - sy / 2.0;
//
//   const aspectRatio = (1.0 * sy) / sx;
//
//   const w = 800;
//
//   const svg = d3
//     .select(".deview")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", 20 + aspectRatio * w)
//     .attr("viewBox", "0 0 " + sx + " " + sy);
//
//   return svg
//     .append("g")
//     .attr("class", className)
//     .attr("transform", "translate(" + -xleft + "," + -ybottom + ")");
// };
//

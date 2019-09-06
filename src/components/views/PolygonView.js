import React from "react";
import PropTypes from "prop-types";
import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";

const PolygonView = ({
  poly,
  outline,
  fill,
  classname,
  prefix,
  onmouseover,
  onmouseout
}) => {
  const colorFunction = scaleSequential()
    .domain([0, 500])
    .interpolator(interpolateViridis);
  const st = {
    stroke: "blue",
    fill: fill && poly.value ? colorFunction(poly.value) : "none"
  };
  return (
    <polygon
      className={classname}
      id={prefix + poly.id}
      data-value={poly.value}
      points={poly.vertices.map(v => [v.x, v.y].join(","))}
      onMouseOver={onmouseover}
      onMouseOut={onmouseout}
      style={st}
    />
  );
};

PolygonView.propTypes = {
  poly: PropTypes.shape({
    id: PropTypes.number,
    vertices: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
    ),
    value: PropTypes.number
  }),
  outline: PropTypes.bool,
  fill: PropTypes.bool,
  prefix: PropTypes.string,
  classname: PropTypes.string,
  onmouseover: PropTypes.func,
  onmouseout: PropTypes.func
};

export default PolygonView;

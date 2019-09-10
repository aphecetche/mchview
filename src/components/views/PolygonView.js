import React from "react";
import PropTypes from "prop-types";

const PolygonView = ({
  poly,
  styles,
  classname,
  prefix,
  onmouseover,
  onmouseout
}) => {
  const st = {
    stroke: styles.stroke ? styles.stroke() : "red",
    strokeWidth: styles.strokeWidth ? styles.strokeWidth() : 0.35,
    fill: styles.fill ? styles.fill() : "none"
  };
  return (
    <polygon
      className={classname}
      id={(prefix ? prefix : "") + poly.id}
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
  styles: PropTypes.shape({
    stroke: PropTypes.func,
    fill: PropTypes.func
  }),
  prefix: PropTypes.string,
  classname: PropTypes.string,
  onmouseover: PropTypes.func,
  onmouseout: PropTypes.func
};

export default PolygonView;

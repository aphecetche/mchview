import React from "react";
import PropTypes from "prop-types";

const PolygonView = ({ poly, fillColor, classname, prefix, events }) => {
  const st = {
    fill: fillColor ? fillColor : "red",
    fillOpacity: fillColor ? 1 : 0
  };
  return (
    <polygon
      className={classname}
      id={(prefix ? prefix : "") + poly.id}
      data-value={poly.value}
      points={poly.vertices.map(v => [v.x, v.y].join(","))}
      onMouseEnter={
        events && events.onMouseEnter ? e => events.onMouseEnter(e) : null
      }
      onMouseOut={
        events && events.onMouseOut ? e => events.onMouseOut(e) : null
      }
      onClick={events && events.onClick ? e => events.onClick(e) : null}
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

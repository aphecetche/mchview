import React from "react";
import PropTypes from "prop-types";
import { actions as viewActions } from "../../ducks/view";
import { useDispatch } from "react-redux";
import { encode } from "../../categories";

const Polygon = ({ poly, fillColor, classname }) => {
  const dispatch = useDispatch();

  const st = {
    fill: fillColor ? fillColor : "red",
    fillOpacity: fillColor ? 1 : 0
  };

  let comp = <p>Polygon is not defined</p>;

  if (poly) {
    comp = (
      <polygon
        className={classname}
        id={encode(poly.id)}
        key={encode(poly.id)}
        data-value={poly.value}
        points={poly.vertices.map(v => [v.x, v.y].join(","))}
        style={st}
        onMouseEnter={() => {
          dispatch(viewActions.setCurrentElement(poly));
        }}
        onMouseOut={() => {
          dispatch(viewActions.setCurrentElement(null));
        }}
      />
    );
  }
  return comp;
};
Polygon.propTypes = {
  poly: PropTypes.shape({
    id: PropTypes.Object,
    vertices: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
    ),
    value: PropTypes.number
  }),
  fillColor: PropTypes.string,
  classname: PropTypes.string
};

export default Polygon;

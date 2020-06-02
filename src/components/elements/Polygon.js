import React from "react";
import PropTypes from "prop-types";
import { actions as viewActions } from "../../ducks/view";
import { connect } from "react-redux";
import { encode } from "../../categories";

const Polygon = ({ poly, fillColor, classname, setCurrentElement }) => {
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
        data-value={poly.value}
        points={poly.vertices.map(v => [v.x, v.y].join(","))}
        style={st}
        onMouseEnter={() => {
          setCurrentElement(poly.id, poly.value);
        }}
        onMouseOut={() => {
          setCurrentElement(undefined, undefined);
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
  classname: PropTypes.string,
  setCurrentElement: PropTypes.func
};

export default connect(
  state => state,
  dispatch => {
    return {
      setCurrentElement: (id, value) =>
        dispatch(viewActions.setCurrentElement(id, value))
    };
  }
)(Polygon);

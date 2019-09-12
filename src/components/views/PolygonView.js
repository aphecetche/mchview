import React from "react";
import PropTypes from "prop-types";
import { actions as viewActions } from "../../ducks/view";
import { connect } from "react-redux";

const PolygonView = ({
  poly,
  fillColor,
  classname,
  prefix,
  setCurrentElement
}) => {
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
      style={st}
      onMouseEnter={() => {
        setCurrentElement(prefix, poly.id, poly.value);
      }}
      onMouseOut={() => {
        setCurrentElement(undefined, undefined);
      }}
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
  fillColor: PropTypes.string,
  prefix: PropTypes.string,
  classname: PropTypes.string,
  setCurrentElement: PropTypes.func
};

export default connect(
  state => state,
  dispatch => {
    return {
      setCurrentElement: (a, b, c) =>
        dispatch(viewActions.setCurrentElement(a, b, c))
    };
  }
)(PolygonView);

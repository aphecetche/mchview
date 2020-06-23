import React from "react";
import Polygon from "./Polygon";
import { encode } from "../../categories";
import PropTypes from "prop-types";

const Pad = ({ id, vertices, value = 0, outlineStyle }) => {
  const p = {
    vertices: vertices,
    value: value,
    id: id
  };
  return (
    <Polygon classname="pad" key={encode(id)} poly={p} style={outlineStyle} />
  );
};

Pad.propTypes = {
  id: PropTypes.object,
  outlineStyle: PropTypes.object,
  vertices: PropTypes.array,
  value: PropTypes.number
};

export default Pad;

import React from "react";
import SVGGroup from "./SVGGroup";
import Polygon from "./Polygon";
import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";
import { encode } from "../../categories";
import PropTypes from "prop-types";

const DePlane = ({ deplane, outlineStyle }) => {
  const color = scaleSequential()
    .domain([100, 1025])
    .interpolator(interpolateViridis);

  if (!deplane) {
    return null;
  }
  return (
    <SVGGroup groupname="deplane" style={outlineStyle}>
      <Polygon
        classname="deplane"
        key={encode(deplane.id)}
        prefix="DE"
        poly={deplane}
        fillColor={color(101)}
      />
    </SVGGroup>
  );
};

DePlane.propTypes = {
  deplane: PropTypes.object,
  outlineStyle: PropTypes.object
};

export default DePlane;

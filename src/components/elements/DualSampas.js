import React from "react";
import SVGGroup from "./SVGGroup";
import Polygon from "./Polygon";

import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";
import { encode } from "../../categories";
import PropTypes from "prop-types";

const colorDS = scaleSequential()
  .domain([0, 1500])
  .interpolator(interpolateViridis);

const DualSampas = ({ ds, outlineStyle }) => {
  if (ds === undefined) {
    return null;
  }
  const dspoly = [];
  Object.keys(ds).forEach(key => {
    let single = ds[key];
    dspoly.push(
      <Polygon
        classname="ds"
        key={encode(single.id)}
        poly={single}
        fillColor={colorDS(single.value)}
      />
    );
  });

  return (
    <SVGGroup groupname="dualsampas" style={outlineStyle}>
      {dspoly}
    </SVGGroup>
  );
};

DualSampas.propTypes = {
  ds: PropTypes.array,
  outlineStyle: PropTypes.object
};

export default DualSampas;

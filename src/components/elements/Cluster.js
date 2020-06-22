import React from "react";
import SVGGroup from "./SVGGroup";
import { decode } from "../../categories";
import PropTypes from "prop-types";
import Pad from "./Pad";

const Cluster = ({
  cluster,
  bending = true,
  outlineStyle = {
    stroke: bending ? "green" : "blue",
    strokeWidth: 0.2
  }
}) => {
  const poly = [];

  Object.keys(cluster.pads).map(x => {
    const id = decode(x);
    const { dsid } = id;
    if (
      (bending === true && dsid < 1024) ||
      (bending === false && dsid >= 1024)
    ) {
      poly.push(<Pad key={x} id={id} vertices={cluster.pads[x].vertices} />);
    }
  });
  return (
    <SVGGroup groupname="cluster" style={outlineStyle}>
      {poly}
    </SVGGroup>
  );
};

Cluster.propTypes = {
  cluster: PropTypes.object,
  outlineStyle: PropTypes.object
};

export default Cluster;

import React from "react";

import { encode } from "../../categories";
import { useSelector } from "react-redux";
import polygon from "../elements/Polygon";
import * as categories from "../../categories";

const isWithin = (parent, child) => {
  //FIXME: implement this properly for all categories
  if (
    categories.whatis(parent) == categories.deplane &&
    categories.whatis(child) == categories.ds
  ) {
    return parent.deid == child.deid && parent.bending == child.bending;
  }
  return false;
};

const SVGHighlighter = ({ id, color = "yellow" }) => {
  const poly = useSelector(state => state.view.currentElement);

  if (!poly) {
    return null;
  }

  const style = {
    stroke: color,
    strokeWidth: 0.7,
    fill: "none"
  };
  if (!poly.vertices) {
    return null;
  }
  if (!isWithin(id, poly.id)) {
    return null;
  }
  return (
    <polygon
      className="toto"
      id={encode(poly.id)}
      key={encode(poly.id)}
      data-value={poly.value}
      points={poly.vertices.map(v => [v.x, v.y].join(","))}
      pointerEvents="none"
      style={style}
    />
  );
};

export default SVGHighlighter;

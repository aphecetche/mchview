import React from "react";

import { encode } from "../../categories";
import { useSelector } from "react-redux";
import polygon from "../elements/Polygon";

const SVGHighlighter = ({ color = "yellow" }) => {
  const poly = useSelector(state => state.view.currentElement);

  if (!poly) {
    return null;
  }

  const style = {
    stroke: color,
    strokeWidth: 1,
    fill: "none"
  };
  if (!poly.vertices) {
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

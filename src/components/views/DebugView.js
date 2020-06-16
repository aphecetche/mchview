/* eslint react/prop-types: 0 */

import React from "react";
//import PropTypes from "prop-types";
//import OutlineSelector from "../selectors/OutlineSelector";
//import * as categories from "../../categories";

//      <OutlineSelector elements={[categories.deplane]} />

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

const Rect = ({
  x = 0,
  y = 0,
  w = DEFAULT_WIDTH,
  h = DEFAULT_HEIGHT,
  color = "lightblue",
  transform
}) => {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      transform={transform}
      style={{
        fill: "none",
        stroke: color,
        strokeWidth: 10
      }}
    />
  );
};

const DebugView = () => {
  const w = DEFAULT_WIDTH;
  const h = DEFAULT_HEIGHT;
  const scale = 0.5;
  return (
    <React.Fragment>
      <p>DebugView</p>
      <div>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <g transform=""></g>
          <Rect transform={`scale(${scale})`} />
          <Rect color="red" transform={`translate(${w / 2}) scale(${scale})`} />
          <Rect
            color="green"
            transform={`scale(${scale}) translate(${w / 2 / scale} ${h /
              2 /
              scale})`}
          />
          <Rect
            color="yellow"
            transform={`scale(${scale}) translate(${w * scale} ${h * scale})`}
          />
        </svg>
      </div>
    </React.Fragment>
  );
};

DebugView.propTypes = {};

export default DebugView;

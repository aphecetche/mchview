import React, { useState, useEffect } from "react";
import styles from "./display.css";
import PolygonView from "./PolygonView";
import SVGView from "./SVGView";

const Rect = ({ cn, x = 0, y = 0, w, h, setViewBox, currentViewBox }) => (
  <g className={styles[cn]}>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      onClick={() => {
        const same =
          x == currentViewBox.x &&
          y == currentViewBox.y &&
          h == currentViewBox.h &&
          w == currentViewBox.w;
        if (same) {
          setViewBox({ x: 0, y: 0, w: 500, h: 500 });
        } else {
          setViewBox({ x, y, w, h });
        }
      }}
    />
    <text x={x + 10} y={y + h / 2.0}>
      toto{cn}
    </text>
  </g>
);

const Display = () => {
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 500, h: 500 });

  const vb = viewBox.x + " " + viewBox.y + " " + viewBox.w + " " + viewBox.h;

  return (
    <div className={styles.display}>
      <svg
        width="100%"
        height="100%"
        viewBox={vb}
        preserveAspectRatio="xMidYMid meet"
      >
        <Rect
          cn="blue"
          w={250}
          h={250}
          setViewBox={setViewBox}
          currentViewBox={viewBox}
        />
        <Rect
          cn="green"
          y={250}
          h={250}
          w={250}
          setViewBox={setViewBox}
          currentViewBox={viewBox}
        />
        <Rect
          cn="salmon"
          y={300}
          x={300}
          h={100}
          w={100}
          setViewBox={setViewBox}
          currentViewBox={viewBox}
        />
        <Rect
          cn="gray"
          y={0}
          x={300}
          h={300}
          w={200}
          setViewBox={setViewBox}
          currentViewBox={viewBox}
        />
        <svg x="50%" y="50%" height="50%" width="50%" style={{ stroke: "red" }}>
          {/* <Rect cn="lime" x={0} y={0} w="100%" h="100%" /> */}
          <g transform="translate(80,40)">
            {/* <Rect cn="gray" x={-80} y={-40} w={250} h={250} /> */}
            <PolygonView poly={de} />
          </g>
        </svg>
      </svg>
    </div>
  );
};

export default Display;

const de = {
  id: 501,
  bending: false,
  x: 2.8571439419999933,
  y: 0,
  sx: 154.285714284,
  sy: 40,
  vertices: [
    { x: -74.2857132, y: 20 },
    { x: -74.2857132, y: -20 },
    { x: 55.714284074, y: -20 },
    { x: 55.714284074, y: -17.5 },
    { x: 57.857141215999995, y: -17.5 },
    { x: 57.857141215999995, y: -15 },
    { x: 60.714285170000004, y: -15 },
    { x: 60.714285170000004, y: -12.5 },
    { x: 64.28571428400001, y: -12.5 },
    { x: 64.28571428400001, y: -10 },
    { x: 70.000003266, y: -10 },
    { x: 70.000003266, y: -7.5 },
    { x: 80.00000108399999, y: -7.5 },
    { x: 80.00000108399999, y: 20 },
    { x: -74.2857132, y: 20 }
  ]
};

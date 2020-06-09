import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Target from "./Target";

const cursorPoint = (event, svg) => {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
};

const SVGView = ({
  geo,
  classname,
  children,
  initialOffset = { x: 0, y: 0 },
  initialZoom = 1
}) => {
  const [point, setPoint] = useState(null);
  const [zoom, setZoom] = useState(initialZoom);
  const [translation, setTranslation] = useState({
    x: initialOffset.x,
    y: initialOffset.y
  });
  const [isPanning, setIsPanning] = useState(false);

  console.log("point=", point);
  console.log("zoom=", zoom);
  console.log("translation=", translation);
  const svgRef = useRef();
  if (!geo) {
    return null;
  }

  if (translation == 0) {
    return null;
  }

  const aspectRatio = (1.0 * geo.sy) / geo.sx;

  let w = "100%";
  let h = aspectRatio * 100 + "%";
  if (isFinite(h)) {
    return null;
  }
  let vx = geo.sx;
  let vy = geo.sy;

  const transform = `translate(${translation.x},${translation.y}) scale(${zoom})`;

  console.log("transform=", transform);
  return (
    <svg
      ref={svgRef}
      width={w}
      height={h}
      viewBox={`0 0 ${vx} ${vy}`}
      onWheel={event => {
        if (isPanning) {
          return;
        }
        if (!point) {
          return;
        }
        let z = zoom + event.deltaY * -0.01;
        z = Math.min(Math.max(0.1, z), 10);
        setZoom(z);
        setTranslation({
          x: -translation.x * (zoom - 1),
          y: -translation.y * (zoom - 1)
        });
      }}
      onMouseLeave={() => setPoint(null)}
      onMouseDown={event => {
        event.preventDefault();
        setIsPanning(true);
      }}
      onMouseUp={event => {
        event.preventDefault();
        setIsPanning(false);
      }}
      onMouseMove={event => {
        event.preventDefault();
        const p = cursorPoint(event, svgRef.current);
        setPoint(p);
        if (!isPanning) {
          return;
        }
        setTranslation({
          x: p.x,
          y: p.y
        });
      }}
    >
      <g className={classname} transform={transform}>
        {children}
      </g>
      <Target x={0} y={0} color="red" />
      <Target x={vx / 2} y={vy / 2} color="green" />
      <Target x={vx} y={vy} color="blue" />
      {point ? <Target x={point.x} y={point.y} scale={0.5} /> : null}
    </svg>
  );
};

SVGView.propTypes = {
  geo: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    sx: PropTypes.number,
    sy: PropTypes.number
  }),
  initialOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  initialZoom: PropTypes.number,
  classname: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SVGView;

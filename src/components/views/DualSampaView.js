import React from "react";
import PropTypes from "prop-types";
import styles from "./dualsampaview.css";
import classNames from "classnames";
import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";

const DualSampaView = ({ ds, outline = true, fill = false }) => {
  let polygonClass = classNames({
    [styles.dualsampa]: true,
    [styles.outline]: outline
  });
  const colorFunction = scaleSequential()
    .domain([0, 500])
    .interpolator(interpolateViridis);
  const st = {
    fill: fill ? colorFunction(ds.Value) : "none"
  };
  return (
    <polygon
      className={polygonClass}
      id={"DS" + ds.ID}
      data-value={ds.Value}
      points={ds.Vertices.map(v => [v.X, v.Y].join(","))}
      onMouseOver={e => e.target.classList.add(styles.highlight)}
      onMouseOut={e => e.target.classList.remove(styles.highlight)}
      style={st}
    />
  );
};

DualSampaView.propTypes = {
  ds: PropTypes.shape({
    ID: PropTypes.number,
    Vertices: PropTypes.arrayOf(
      PropTypes.shape({
        X: PropTypes.number,
        Y: PropTypes.number
      })
    ),
    Value: PropTypes.number
  }),
  outline: PropTypes.bool,
  fill: PropTypes.bool
};

export default DualSampaView;

import React from "react";
import PropTypes from "prop-types";
import styles from "./dualsampaview.css";
import classNames from "classnames";
const DualSampaView = ({
  ds,
  outline = true,
  fill = false,
  fillcolor = "black"
}) => {
  let polygonClass = classNames({
    [styles.dualsampa]: true,
    [styles.outline]: outline
  });
  const st = {
    fill: fill ? fillcolor : "none"
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

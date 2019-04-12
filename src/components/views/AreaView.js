import React from "react";
import PropTypes from "prop-types";
import styles from "./area.css";

const AreaView = ({ clip, area }) => {
  const axmin = area.xmin;
  const axmax = area.xmax;
  const aymin = area.ymin;
  const aymax = area.ymax;

  const xmin = clip.X - clip.SX / 2.0;
  const xmax = clip.X + clip.SX / 2.0;
  const ymin = clip.Y - clip.SY / 2.0;
  const ymax = clip.Y + clip.SY / 2.0;
  return (
    <g className={styles.area}>
      <g className={styles.left}>
        <path d={"M" + axmin + " " + ymin + " L " + axmin + " " + ymax} />
      </g>
      <g className={styles.right}>
        <path d={"M" + axmax + " " + ymin + " L " + axmax + " " + ymax} />
      </g>
      <g className={styles.top}>
        <path d={"M" + xmin + " " + aymax + " L " + xmax + " " + aymax} />
      </g>
      <g className={styles.bottom}>
        <path d={"M" + xmin + " " + aymin + " L " + xmax + " " + aymin} />
      </g>
    </g>
  );
};

AreaView.propTypes = {
  clip: PropTypes.shape({
    X: PropTypes.number.isRequired,
    Y: PropTypes.number.isRequired,
    SX: PropTypes.number.isRequired,
    SY: PropTypes.number.isRequired
  }),
  area: PropTypes.shape({
    xmin: PropTypes.number.isRequired,
    ymin: PropTypes.number.isRequired,
    xmax: PropTypes.number.isRequired,
    ymax: PropTypes.number.isRequired
  })
};

export default AreaView;

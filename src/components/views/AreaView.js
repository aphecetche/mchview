import React from "react";
import PropTypes from "prop-types";
import styles from "./area.css";
import VerticalLine from "../ui/VerticalLine";
import HorizontalLine from "../ui/HorizontalLine";

const AreaView = ({ clip, area }) => {
  if (!area) {
    return null;
  }
  const axmin = parseFloat(area.xmin);
  const axmax = parseFloat(area.xmax);
  const aymin = parseFloat(area.ymin);
  const aymax = parseFloat(area.ymax);

  const xmin = clip.x - clip.sx / 2.0;
  const xmax = clip.x + clip.sx / 2.0;
  const ymin = clip.y - clip.sy / 2.0;
  const ymax = clip.y + clip.sy / 2.0;
  return (
    <g className={styles.area}>
      <VerticalLine x={axmin} ymin={ymin} ymax={ymax} classname={styles.left} />
      <VerticalLine
        x={axmax}
        ymin={ymin}
        ymax={ymax}
        classname={styles.right}
      />
      <HorizontalLine
        y={aymax}
        xmin={xmin}
        xmax={xmax}
        classname={styles.top}
      />
      <HorizontalLine
        y={aymin}
        xmin={xmin}
        xmax={xmax}
        classname={styles.bottom}
      />
    </g>
  );
};

AreaView.propTypes = {
  clip: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    sx: PropTypes.number.isRequired,
    sy: PropTypes.number.isRequired
  }),
  area: PropTypes.shape({
    xmin: PropTypes.string.isRequired,
    ymin: PropTypes.string.isRequired,
    xmax: PropTypes.string.isRequired,
    ymax: PropTypes.string.isRequired
  })
};

export default AreaView;

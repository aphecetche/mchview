import React from "react";
import styles from "./outlineselector.css";
import PropTypes from "prop-types";
import OutlineSelectorButton from "./OutlineSelectorButton";

const OutlineSelectorToggle = props => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.name}
    </button>
  );
};

OutlineSelectorToggle.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const OutlineSelector = ({ elements }) => (
  <div className={styles.outlineselector}>
    <ul>
      {elements.map(x => {
        return (
          <li key={x.name}>
            <OutlineSelectorButton
              label={x.name}
              value={x.visible}
              onClick={() => (x.toggle ? x.toggle() : null)}
              avail={x.available}
            />
          </li>
        );
      })}
    </ul>
  </div>
);

OutlineSelector.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
      available: PropTypes.bool.isRequired,
      toggle: PropTypes.func
    })
  )
};

export default OutlineSelector;

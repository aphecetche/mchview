import React from "react";
import styles from "./outlineselectorbutton.css";
import PropTypes from "prop-types";

const OutlineSelectorButton = ({ label, value, onClick, avail }) => {
  if (value == true && avail == false) {
    return <p>Invalid OutlineSelectorButton state</p>;
  }
  if (value == false && avail == false) {
    // disable click for invalid state
    onClick = () => {};
  }
  return (
    <div className={styles.outlineselectorbutton}>
      <input
        type="checkbox"
        id={label}
        readOnly
        checked={value}
        onClick={() => onClick()}
      />
      <label htmlFor={label}>
        {label}
        <span className={avail ? styles.avail : styles.unavail}></span>
      </label>
    </div>
  );
};

OutlineSelectorButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  avail: PropTypes.bool
};

export default OutlineSelectorButton;

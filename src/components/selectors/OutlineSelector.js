import React, { useState } from "react";
import "./outlineselector.css";
import PropTypes from "prop-types";
import ShowOutline from "../../models/ShowOutline";

const OutlineSelectorButton = ({ label }) => {
  const [isOutlined, setIsOutlined] = useState(false);
  return (
    <li>
      <input
        type="checkbox"
        id={label}
        defaultChecked={isOutlined}
        onClick={() => {
          setIsOutlined(!isOutlined);
        }}
      />
      <label htmlFor={label}>{label}</label>
    </li>
  );
};

OutlineSelectorButton.propTypes = {
  label: PropTypes.string.isRequired
};

const individualButtons = () => {
  return Object.keys(ShowOutline).map(x => {
    if (typeof ShowOutline[x] === "function") {
      return;
    }
    return <OutlineSelectorButton key={x} label={x} />;
  });
};

const OutlineSelectorToggle = props => {
  return (
    <button
      onClick={() => {
        ShowOutline["set" + props.name]();
      }}
      disabled={ShowOutline[props.name.toLowerCase()]()}
    >
      {props.name}
    </button>
  );
};

OutlineSelectorToggle.propTypes = {
  name: PropTypes.string.isRequired
};

const OutlineSelector = () => {
  return (
    <div className="outlineselector">
      <ul>{individualButtons()}</ul>
      <div className="outlineselector-buttongroup">
        <OutlineSelectorToggle name="All" />
        <OutlineSelectorToggle name="None" />
      </div>
    </div>
  );
};

export default OutlineSelector;

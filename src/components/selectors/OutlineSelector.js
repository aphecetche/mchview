import React from "react";
import "./outlineselector.css";
import PropTypes from "prop-types";
import ShowOutline from "../../models/ShowOutline";

const OutlineSelectorButton = props => {
  return (
    <li>
      <input
        type="checkbox"
        id={props.for}
        defaultChecked={props.value}
        onClick={e => {
          ShowOutline[e.target.id] = !ShowOutline[e.target.id];
        }}
      />
      <label htmlFor={props.for}>{props.for}</label>
    </li>
  );
};

OutlineSelectorButton.propTypes = {
  for: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired
};

const individualButtons = () => {
  return Object.keys(ShowOutline).map(x => {
    if (typeof ShowOutline[x] === "function") {
      return;
    }
    return <OutlineSelectorButton key={x} for={x} value={ShowOutline[x]} />;
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

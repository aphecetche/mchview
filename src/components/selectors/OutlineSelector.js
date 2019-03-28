import React from "react";
import "./outlineselector.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const OutlineSelectorButton = ({ label, value, onClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        id={label}
        defaultChecked={value}
        onClick={onClick}
      />
      <label htmlFor={label}>{label}</label>
    </li>
  );
};

OutlineSelectorButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

const OutlineSelectorToggle = props => {
  return (
    <button
    // onClick={() => {
    //   ShowOutline["set" + props.name]();
    // }}
    // disabled={ShowOutline[props.name.toLowerCase()]()}
    >
      {props.name}
    </button>
  );
};

OutlineSelectorToggle.propTypes = {
  name: PropTypes.string.isRequired
};

const _OutlineSelector = ({ chamber, de, ds, pad }) => {
  return (
    <div className="outlineselector">
      <ul>
        <OutlineSelectorButton key="chamber" label="chamber" value={chamber} />
        <OutlineSelectorButton key="de" label="de" value={de} />
        <OutlineSelectorButton key="ds" label="ds" value={ds} />
        <OutlineSelectorButton key="pad" label="pad" value={pad} />
      </ul>
      <div className="outlineselector-buttongroup">
        <OutlineSelectorToggle name="All" />
        <OutlineSelectorToggle name="None" />
      </div>
    </div>
  );
};

_OutlineSelector.propTypes = {
  chamber: PropTypes.bool.isRequired,
  de: PropTypes.bool.isRequired,
  ds: PropTypes.bool.isRequired,
  pad: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    chamber: state.outline.chamber,
    de: state.outline.de,
    ds: state.outline.ds,
    pad: state.outline.pad
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

const OutlineSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(_OutlineSelector);

export default OutlineSelector;

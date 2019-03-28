import React from "react";
import "./outlineselector.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PartNames } from "../../constants";
import * as actions from "../../store/actions";
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

const _OutlineSelector = ({ outline, toggleOutline }) => {
  return (
    <div className="outlineselector">
      <ul>
        <OutlineSelectorButton
          key={PartNames.Chamber}
          label={PartNames.Chamber}
          value={outline[PartNames.Chamber]}
          onClick={() => toggleOutline(PartNames.Chamber)}
        />
        <OutlineSelectorButton
          key={PartNames.DetectionElement}
          label={PartNames.DetectionElement}
          value={outline[PartNames.DetectionElement]}
        />
        <OutlineSelectorButton
          key={PartNames.DualSampa}
          label={PartNames.DualSampa}
          value={outline[PartNames.DualSampa]}
        />
        <OutlineSelectorButton
          key={PartNames.Pad}
          label={PartNames.Pad}
          value={outline[PartNames.Pad]}
        />
      </ul>
      <div className="outlineselector-buttongroup">
        <OutlineSelectorToggle name="All" />
        <OutlineSelectorToggle name="None" />
      </div>
    </div>
  );
};

_OutlineSelector.propTypes = {
  outline: PropTypes.shape({
    [PartNames.Chamber]: PropTypes.bool.isRequired,
    [PartNames.DetectionElement]: PropTypes.bool.isRequired,
    [PartNames.DualSampa]: PropTypes.bool.isRequired,
    [PartNames.Pad]: PropTypes.bool.isRequired
  }),
  toggleOutline: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    outline: state.outline
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleOutline: x => dispatch(actions.toggleOutline(x))
  };
};

const OutlineSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(_OutlineSelector);

export default OutlineSelector;

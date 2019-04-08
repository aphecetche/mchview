import React from "react";
import "./outlineselector.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LayerCategories } from "../../constants";
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
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.name}
    </button>
  );
};

OutlineSelectorToggle.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

const _OutlineSelector = ({ outline, toggleOutline, showOutlineForAll }) => {
  const buttons = LayerCategories.map(x => {
    return (
      <OutlineSelectorButton
        key={x.key}
        label={x.name}
        value={outline[x.key]}
        onClick={() => toggleOutline(x.key)}
      />
    );
  });
  return (
    <div className="outlineselector">
      <ul>{buttons}</ul>
      <div className="outlineselector-buttongroup">
        <OutlineSelectorToggle
          name="All"
          disabled={LayerCategories.every(x => outline[x.key] === true)}
          onClick={() => showOutlineForAll()}
        />
        <OutlineSelectorToggle
          name="None"
          disabled={LayerCategories.every(x => outline[x.key] === false)}
        />
      </div>
    </div>
  );
};

_OutlineSelector.propTypes = {
  outline: PropTypes.object.isRequired,
  toggleOutline: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    outline: state.outline
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleOutline: x => dispatch(actions.toggleOutline(x)),
    showOutlineForAll: () => dispatch(actions.showOutlineForAll())
  };
};

const OutlineSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(_OutlineSelector);

export default OutlineSelector;

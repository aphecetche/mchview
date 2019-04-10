import React from "react";
import "./outlineselector.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  actions,
  LayerCategories,
  getAllSelected,
  getNoneSelected
} from "../../ducks/outline.js";

const OutlineSelectorButton = ({ label, value, onClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        id={label}
        readOnly
        checked={value}
        onClick={onClick}
      />
      <label htmlFor={label}>{label}</label>
    </li>
  );
};

OutlineSelectorButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
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
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const _OutlineSelector = ({
  outline,
  toggleOutline,
  showOutlineForAll,
  showOutlineForNone
}) => {
  const buttons = () =>
    LayerCategories.map(x => {
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
      <ul>{buttons()}</ul>
      <div className="outlineselector-buttongroup">
        <OutlineSelectorToggle
          name="All"
          disabled={getAllSelected(outline)}
          onClick={() => showOutlineForAll()}
        />
        <OutlineSelectorToggle
          name="None"
          disabled={getNoneSelected(outline)}
          onClick={() => showOutlineForNone()}
        />
      </div>
    </div>
  );
};

_OutlineSelector.propTypes = {
  outline: PropTypes.object.isRequired,
  toggleOutline: PropTypes.func.isRequired,
  showOutlineForNone: PropTypes.func.isRequired,
  showOutlineForAll: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    outline: state.outline
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleOutline: x => dispatch(actions.toggleOutline(x)),
    showOutlineForAll: () => dispatch(actions.showOutlineForAll()),
    showOutlineForNone: () => dispatch(actions.showOutlineForNone())
  };
};

const OutlineSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(_OutlineSelector);

export default OutlineSelector;

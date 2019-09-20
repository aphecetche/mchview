import React from "react";
import styles from "./outlineselector.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "../../ducks/outline.js";
import { selectors } from "../../reducers";
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

const OutlineSelector = ({ elements, isVisible, isAvailable, toggle }) => (
  <div className={styles.outlineselector}>
    <ul>
      {elements.map(x => {
        return (
          <li key={x.name}>
            <OutlineSelectorButton
              label={x.name}
              value={isVisible(x)}
              onClick={() => (toggle ? toggle(x) : null)}
              avail={isAvailable(x)}
            />
          </li>
        );
      })}
    </ul>
  </div>
);

OutlineSelector.propTypes = {
  elements: PropTypes.array.isRequired,
  isVisible: PropTypes.func.isRequired,
  isAvailable: PropTypes.func.isRequired,
  toggle: PropTypes.func
};

const mapStateToProps = state => {
  return {
    isVisible: x => selectors.isVisible(state, x),
    isAvailable: x => selectors.isAvailable(state, x)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggle: x => dispatch(actions.toggleOutline(x))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutlineSelector);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "../../ducks/view.js";
import { selectors } from "../../reducers";

import styles from "./viewselector.css";
import { isValidDeId, listOfValidDeIds } from "../../categories";

const deListPattern = () => {
  const rv = listOfValidDeIds.join("|");
  return rv;
};

const _ViewSelector = ({ deid, bending, setDEID }) => {
  if (!isValidDeId(deid)) {
    return "Invalid DE";
  }
  return (
    <div className={styles.elementselector}>
      <label htmlFor={styles.denumberselector}>DE</label>
      <input
        id={styles.denumberselector}
        pattern={deListPattern()}
        required="required"
        size="4"
        defaultValue={deid}
        onChange={e => {
          if (e.target.validity.valid) {
            setDEID(e.target.value, bending);
          }
        }}
      />
      <label htmlFor={styles.deplaneselector}>
        {bending === true ? "bending" : "non-bending"}
      </label>
      <input
        id={styles.deplaneselector}
        type="checkbox"
        defaultChecked={bending}
        onChange={e => {
          setDEID(deid, e.target.checked);
        }}
      />
    </div>
  );
};

_ViewSelector.propTypes = {
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired,
  setDEID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  deid: selectors.deid(state),
  bending: selectors.bending(state)
});

const mapDispatchToProps = dispatch => ({
  setDEID: (deid, bending) => {
    dispatch(actions.setDetectionElement(deid, bending));
  }
});

const ViewSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ViewSelector);

export default ViewSelector;

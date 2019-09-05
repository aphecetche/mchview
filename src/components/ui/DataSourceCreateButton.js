import styles from "./datasourcecreatebutton.css";
import React from "react";
// import { actions } from "../../ducks/visibility.js";
import { actions as dataActions } from "../../ducks/data.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectors } from "../../reducers.js";

const DataSourceCreateButton = ({ onClick, deid, bending }) => {
  return (
    <button
      className={styles.dataSourceCreateButton}
      onClick={() => onClick(deid, bending)}
    >
      New Data Source
    </button>
  );
};

DataSourceCreateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    // onClick: () => dispatch(actions.showModal())
    onClick: (deid, bending) => dispatch(dataActions.randomData(deid, bending))
  };
};

const mapStateToProps = state => {
  return {
    deid: selectors.deid(state),
    bending: selectors.bending(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourceCreateButton);

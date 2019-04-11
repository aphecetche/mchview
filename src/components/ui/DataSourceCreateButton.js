import "./datasourcecreatebutton.css";
import React from "react";
import { actions } from "../../ducks/visibility.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const DataSourceCreateButton = ({ showModal }) => {
  return (
    <button className="dataSourceCreateButton" onClick={() => showModal()}>
      New Data Source
    </button>
  );
};

DataSourceCreateButton.propTypes = {
  showModal: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    showModal: () => dispatch(actions.showModal())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DataSourceCreateButton);

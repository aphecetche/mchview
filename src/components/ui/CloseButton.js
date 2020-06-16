import React from "react";
import { connect } from "react-redux";
import { actions } from "../../ducks/visibility";
import PropTypes from "prop-types";

const CloseButton = ({ hideModal }) => {
  return <button onClick={() => hideModal()}>Cancel</button>;
};

CloseButton.propTypes = {
  hideModal: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(actions.hideModal())
  };
};

export default connect(null, mapDispatchToProps)(CloseButton);

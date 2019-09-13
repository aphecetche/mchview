import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectors } from "../../reducers.js";
import axios from "axios";
import { normalize, schema } from "normalizr";

const DebugView = ({ state }) => {
  return (
    <div className="allview">
      <p>state.envelop</p>
      <pre>{JSON.stringify(state, {}, 2)}</pre>
    </div>
  );
};

DebugView.propTypes = {
  state: PropTypes.object
};

const mapStateToProps = state => {
  return {
    state: state.envelop
  };
};

export default connect(mapStateToProps)(DebugView);

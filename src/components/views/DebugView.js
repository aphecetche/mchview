import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OutlineSelector from "../selectors/OutlineSelector";
import * as categories from "../../categories";
import { actions } from "../../ducks/envelop";
import { selectors } from "../../reducers";

const DebugView = ({
  state,
  deid,
  bending,
  fetchDePlane,
  hasDePlane,
  isFetchingDePlane
}) => {
  if (!hasDePlane(deid, bending)) {
    if (!isFetchingDePlane(deid, bending)) {
      fetchDePlane(deid, bending);
    }
  }
  // if (!selectors.hasDePlane(state, deid, bending)) {
  //   if (!selectors.isFetchingDePlane(state, deid, bending)) {
  //     fetchDePlane(deid, bending);
  //   }
  // }
  return (
    <div className="allview">
      <OutlineSelector elements={[categories.deplane]} />
      <ul>
        <li>deid={deid}</li>
        <li>bending={bending ? "true" : "false"}</li>
        <li>hasDePlane={hasDePlane(deid, bending) ? "yes" : "no"}</li>
        <li>
          isFetching=
          {isFetchingDePlane(deid, bending) ? "yes" : "no"}
        </li>
        <li>
          state.envelop=
          <pre>{JSON.stringify(state, {}, 2)}</pre>
        </li>
      </ul>
    </div>
  );
};

DebugView.propTypes = {
  state: PropTypes.object.isRequired,
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired,
  fetchDePlane: PropTypes.func
};

const mapStateToProps = state => {
  return {
    state: state.envelop,
    isFetchingDePlane: (deid, bending) =>
      selectors.isFetchingDePlane(state, deid, bending),
    hasDePlane: (deid, bending) => selectors.hasDePlane(state, deid, bending)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDePlane: (deid, bending) =>
      dispatch(actions.fetchDePlane(deid, bending))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugView);

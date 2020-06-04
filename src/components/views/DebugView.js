import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OutlineSelector from "../selectors/OutlineSelector";
import * as categories from "../../categories";
import { actions, selectors } from "../../ducks/envelop";

const DebugView = ({
  state,
  id,
  fetchDePlane,
  hasDePlane,
  isFetchingDePlane
}) => {
  if (!hasDePlane(id)) {
    if (!isFetchingDePlane(id)) {
      fetchDePlane(id);
    }
  }
  const { deid, bending } = id;
  return (
    <div className="allview">
      <p>DebugView {JSON.stringify(id)}</p>
      <OutlineSelector elements={[categories.deplane]} />
      <ul>
        <li>deid={deid}</li>
        <li>bending={bending === true ? "true" : "false"}</li>
        <li>hasDePlane={hasDePlane(id) ? "yes" : "no"}</li>
        <li>
          isFetching=
          {isFetchingDePlane(id) ? "yes" : "no"}
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
  id: PropTypes.object.isRequired,
  fetchDePlane: PropTypes.func,
  hasDePlane: PropTypes.func,
  isFetchingDePlane: PropTypes.func
};

const mapStateToProps = state => {
  return {
    state: state.envelop,
    isFetchingDePlane: id => selectors.isFetchingDePlane(state.envelop, id),
    hasDePlane: id => selectors.hasDePlane(state.envelop, id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDePlane: id => dispatch(actions.fetchDePlane(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DebugView);

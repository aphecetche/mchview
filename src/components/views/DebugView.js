import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectors } from "../../reducers.js";
import axios from "axios";
import { normalize, schema } from "normalizr";

const fetchData = (deid, bending, setdata) => {
  const dualsampa = new schema.Entity("dualsampas", undefined, {
    // convert local id to some global id using the deid
    idAttribute: value => deid + "-" + value.id,
    // append the deid to the dualsampa object
    processStrategy: entity => Object.assign({}, { ...entity, deid: deid })
  });

  let url =
    "http://localhost:8080/v2/dualsampas?deid=" + deid + "&bending=" + bending;
  axios.get(url).then(response => {
    const normalizedData = normalize(response.data, [dualsampa]);
    setdata(normalizedData);
  });
};

const DebugView = ({ deid, bending, toto }) => {
  let [data, setdata] = useState({});

  useEffect(() => {
    fetchData(deid, bending, setdata);
  }, [deid, bending]);

  return (
    <div className="allview">
      <p>DebugView would be here </p>
      {toto ? <h1>FETCHING</h1> : ""}
      <h2>DE={deid}</h2>
      <h2>Bending={bending}</h2>
      <pre>{JSON.stringify(data, {}, 2)}</pre>
    </div>
  );
};

DebugView.propTypes = {
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onClick: (deid, bending) => dispatch(dataActions.randomData(deid, bending))
//   };
// };

const mapStateToProps = state => {
  return {
    deid: selectors.deid(state),
    bending: selectors.bending(state),
    toto: selectors.isFetching(state)
  };
};

export default connect(mapStateToProps)(DebugView);

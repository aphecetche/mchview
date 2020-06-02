import React from "react";
import styles from "./deview.css";
import Polygon from "../elements/Polygon";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import Loader from "react-loader-spinner";

const DeView = ({ bending, nonBending, isFetching }) => {
  console.log(
    "bending=",
    bending,
    "non-bending=",
    nonBending,
    "isFetching=",
    isFetching
  );
  if (isFetching) {
    return <Loader key="loader" type="Watch" className={styles.loader} />;
  }
  return (
    <svg
      className={styles.deview}
      width="100%"
      height="80vh"
      viewBox="0 0 300 100"
    >
      <g transform="translate(80 20)">
        <Polygon poly={bending} />
      </g>
      <g transform="translate(80 80)">
        <Polygon poly={nonBending} />
      </g>
    </svg>
  );
};

const mapStateToProps = state => ({
  isFetching:
    selectors.isFetchingDe(state, selectors.deid(state), true) ||
    selectors.isFetchingDe(state, selectors.deid(state), false),
  bending: selectors.deplane(state, selectors.deid(state), true),
  nonBending: selectors.deplane(state, selectors.deid(state), false)
});

export default connect(mapStateToProps)(DeView);

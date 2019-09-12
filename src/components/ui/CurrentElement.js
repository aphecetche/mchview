import React from "react";
import styles from "./currentelement.css";
import { connect } from "react-redux";
import { selectors } from "../../reducers";

export const PureCurrentElement = ({ type, id, value }) => {
  if (!(type && id)) {
    return (
      <div className={styles.currentelement}>
        <p>No current element under the (mouse) cursor.</p>
      </div>
    );
  }
  return (
    <div className={styles.currentelement}>
      <ul>
        <li>{type}</li>
        <li>{id}</li>
        {value ? (
          <li>
            <span>Value</span>
            {value}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default connect(state => {
  const ce = selectors.currentElement(state);
  return ce ? ce : {};
})(PureCurrentElement);

import React from "react";
import styles from "./currentelement.css";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import { describe, isvalid } from "../../categories";
import PropTypes from "prop-types";

export const PureCurrentElement = ({ id, value }) => {
  if (!id) {
    return (
      <div className={styles.currentelement}>
        <p>No current element under the (mouse) cursor.</p>
      </div>
    );
  }
  return (
    <div className={styles.currentelement}>
      <ul>
        <li>
          {describe(id)}
          {isvalid(id) ? (
            ""
          ) : (
            <span className={styles.invalid}>[ Invalid ID ]</span>
          )}
        </li>
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
PureCurrentElement.propTypes = {
  id: PropTypes.object,
  value: PropTypes.number
};

export default connect(state => {
  const ce = selectors.currentElement(state);
  return ce ? ce : {};
})(PureCurrentElement);

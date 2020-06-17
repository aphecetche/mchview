import React from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import { describe, isValid } from "../../categories";
import PropTypes from "prop-types";

export const PureCurrentElement = ({ id, value }) => {
  if (!id) {
    return (
      <div>
        <p>No current element under the (mouse) cursor.</p>
      </div>
    );
  }
  return (
    <div>
      <ul>
        <li>
          {describe(id)}
          {isValid(id) ? "" : <span>[ Invalid ID ]</span>}
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

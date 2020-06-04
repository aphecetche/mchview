import React from "react";
import PropTypes from "prop-types";

import styles from "./deplaneselector.css";
import { isValidDeId, listOfValidDeIds } from "../../categories";
import * as envelop from "../../ducks/envelop";

const deListPattern = () => {
  const rv = listOfValidDeIds.join("|");
  return rv;
};

const DePlaneSelector = ({ id, setDEID }) => {
  const { deid, bending } = id;
  if (!isValidDeId(deid)) {
    return "Invalid DE";
  }
    const label = envelop.dePlaneName(bending);
    console.log("bending="+bending+" label="+label)
  return (
    <div className={styles.deplaneselector}>
      <label htmlFor={styles.denumberselector}>DE</label>
      <input
        id={styles.denumberselector}
        pattern={deListPattern()}
        required="required"
        size="4"
        defaultValue={deid}
        onChange={e => {
          if (e.target.validity.valid) {
            setDEID(e.target.value, bending);
          }
        }}
      />
      <label htmlFor={styles.planeselector}>
      {label}
      </label>
      <input
        id={styles.planeselector}
        type="checkbox"
        defaultChecked={bending}
        onChange={e => {
          setDEID(deid, e.target.checked);
        }}
      />
    </div>
  );
};

DePlaneSelector.propTypes = {
  id: PropTypes.object.isRequired,
  setDEID: PropTypes.func.isRequired
};

export default DePlaneSelector;

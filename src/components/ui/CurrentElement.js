import React from "react";
import styles from "./currentelement.css";

const CurrentElement = ({ type, id }) => {
  return (
    <div className={styles.currentelement}>
      <ul>
        <li>{type}</li>
        <li>{id}</li>
      </ul>
    </div>
  );
};

export default CurrentElement;

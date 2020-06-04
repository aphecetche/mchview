import styles from "./topbar.css";
import React from "react";
import OutlineSelector from "../selectors/OutlineSelector";
import * as categories from "../../categories";

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <OutlineSelector
        elements={[categories.deplane, categories.ds, categories.cluster]}
      />
    </div>
  );
};

export default TopBar;

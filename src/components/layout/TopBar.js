import styles from "./topbar.css";
import React from "react";
import OutlineSelector from "../selectors/OutlineSelector";
import ViewSelector from "../selectors/ViewSelector";

const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <OutlineSelector />
      <ViewSelector />
    </div>
  );
};

export default TopBar;

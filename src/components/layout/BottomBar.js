import React from "react";
import styles from "./bottombar.css";
import DataSourceCreateButton from "../ui/DataSourceCreateButton";
import DataSourceSelector from "../selectors/DataSourceSelector";
const BottomBar = () => {
  return (
    <div className={styles.bottombar}>
      <DataSourceCreateButton />
      <DataSourceSelector />
    </div>
  );
};
export default BottomBar;

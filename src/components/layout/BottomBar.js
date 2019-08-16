import React from "react";
import styles from "./bottombar.css";
import DataSourceCreateButton from "../ui/DataSourceCreateButton";
import DataSourceListButton from "../ui/DataSourceListButton";
import DataSourceSelector from "../selectors/DataSourceSelector";

const listDataSources = () => {
  alert("titi");
};

const BottomBar = () => {
  return (
    <div className={styles.bottombar}>
      <DataSourceCreateButton />
      <DataSourceSelector />
      <DataSourceListButton listDataSources={() => listDataSources()} />
    </div>
  );
};
export default BottomBar;

import React from "react";
import styles from "./bottombar.css";
import DataSourceCreateButton from "../ui/DataSourceCreateButton";
import DataSourceListButton from "../ui/DataSourceListButton";
import DataSourceSelector from "../selectors/DataSourceSelector";
import CurrentElement from "../ui/CurrentElement";

const listDataSources = () => {
  alert("titi");
};

const BottomBar = () => {
  return (
    <div className={styles.bottombar}>
      <DataSourceCreateButton />
      <DataSourceSelector />
      <DataSourceListButton listDataSources={() => listDataSources()} />
      <CurrentElement />
    </div>
  );
};
export default BottomBar;

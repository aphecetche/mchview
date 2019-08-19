import React from "react";
import styles from "./bottombar.css";
import DataSourceCreateButton from "../ui/DataSourceCreateButton";
import DataSourceListButton from "../ui/DataSourceListButton";
import DataSourceSelector from "../selectors/DataSourceSelector";
import { TObject2JsonClient } from "@aliceo2/qc";

const listDataSources = () => {
  const config = { hostname: "localhost", port: 6464 };

  const client = new TObject2JsonClient("ccdb", config);

  client.retrieve("<task_path>").then(result => {
    console.log(result);
  });
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

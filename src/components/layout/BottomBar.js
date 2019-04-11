import React from "react";
import "./bottombar.css";
import DataSourceCreateButton from "../ui/DataSourceCreateButton";
import DataSourceSelector from "../selectors/DataSourceSelector";
const BottomBar = () => {
  return (
    <div className="bottombar">
      <DataSourceCreateButton />
      <DataSourceSelector />
    </div>
  );
};
export default BottomBar;

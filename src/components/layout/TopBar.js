import "./topbar.css";
import React from "react";
import OutlineSelector from "../selectors/OutlineSelector";
// import ElementSelector from "../selectors/ElementSelector";

const TopBar = () => {
  return (
    <div className="topbar">
      <OutlineSelector />
      {/* <ElementSelector />  */}
    </div>
  );
};

export default TopBar;

import React from "react";
import styles from "./mainstage.css";
import MchViewPort from "./MchViewPort";
import RightPanel from "./RightPanel";
import AreaSelector from "../selectors/AreaSelector";
import { BrowserRouter as Router } from "react-router-dom";
const MainStage = () => {
  return (
    <div className={styles.mainstage}>
      <Router>
        <MchViewPort />
      </Router>
      <RightPanel>
        <AreaSelector />
      </RightPanel>
    </div>
  );
};

export default MainStage;

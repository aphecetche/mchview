import React from "react";
import styles from "./mainstage.css";
import MchViewPort from "./MchViewPort";
import RightPanel from "./RightPanel";
import AreaSelector from "../selectors/AreaSelector";

const MainStage = () => {
  return (
    <div className={styles.mainstage}>
      <MchViewPort />
      <RightPanel>
        <AreaSelector />
      </RightPanel>
    </div>
  );
};

export default MainStage;

import React from "react";
import styles from "./mainstage.css";
import MchViewPort from "./MchViewPort";
import RightPanel from "./RightPanel";

const MainStage = () => {
  return (
    <div className={styles.mainstage}>
      <MchViewPort />
      <RightPanel>
        <p>Selection of xmin and co would go there</p>
      </RightPanel>
    </div>
  );
};

export default MainStage;

import React from "react";
import "./mainstage.css";
import MchViewPort from "./MchViewPort";
// import RightSidePanel from "./RightSidePanel";
// import ShowRightSidePanel from "../../models/ShowRightSidePanel";

const MainStage = () => {
  return (
    <div className="mainstage">
      <MchViewPort />
    </div>
  );
};
//   return {
//     view: () => {
//       if (ShowRightSidePanel.visible) {
//         return m("mainstage", m(MchViewPort), m(RightSidePanel));
//       }
//       return m("mainstage", m(MchViewPort));
//     }
//   };
// };

export default MainStage;

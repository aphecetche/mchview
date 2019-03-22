import m from "mithril";
import RightSidePanel from "./RightSidePanel";
import ShowRightSidePanel from "../../models/ShowRightSidePanel";

const MainStage = {
  view: ({ children }) => {
    if (ShowRightSidePanel.visible) {
      return m("mainstage", children, m(RightSidePanel));
    }
    return m("mainstage", children);
  }
};

export default MainStage;

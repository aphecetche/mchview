import m from "mithril";
import TopBar from "./views/TopBar";
import MchViewPort from "./views/MchViewPort";
import BottomBar from "./views/BottomBar";
import Modal from "./views/Modal";
import ShowModal from "./models/ShowModal";
import RightSidePanel from "./views/RightSidePanel";
import ShowRightSidePanel from "./models/ShowRightSidePanel";

const Header = {
  view: () => {
    return m(TopBar, "header");
  }
};

const Footer = {
  view: () => {
    return m(BottomBar, "footer");
  }
};

const Main = {
  view: () => {
    if (ShowRightSidePanel.visible) {
      return m("main", m(MchViewPort), m(RightSidePanel));
    }
    return m(MchViewPort);
  }
};

const mchviewApp = {
  view: () => {
    if (ShowModal.visible) {
      return m("mchview", m(Header), m(Main), m(Footer), m(Modal));
    }
    return m("mchview", m(Header), m(Main), m(Footer));
  }
};

console.log("mapping api at " + window.env.MCH_MAPPING_API);
m.mount(document.body, mchviewApp);

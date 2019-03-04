import m from "mithril";
import TopBar from "./views/TopBar";
import MchViewPort from "./views/MchViewPort";
import BottomBar from "./views/BottomBar";
import Modal from "./views/Modal";

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

const mchviewApp = {
  view: () => {
    return m("mchview", m(Header), m(MchViewPort), m(Footer), m(Modal));
  }
};

m.mount(document.body, mchviewApp);

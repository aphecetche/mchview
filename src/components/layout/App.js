import m from "mithril";
import TopBar from "./TopBar";
import MainStage from "../layout/mainstage.js";
import DEView from "../views/DEView";
import BottomBar from "./BottomBar";
// import Modal from "./views/Modal";
// import ShowModal from "./models/ShowModal";
//
// const mchviewApp = {
//   view: () => {
//     if (ShowModal.visible) {
//       return m("mchview", m(Header), m(Main), m(Footer), m(Modal));
//     }
//     return m("mchview", m(Header), m(Main), m(Footer));
//   }
// };
//

const App = () => {
  return {
    oncreate: vnode => {
      const main = vnode.dom.querySelector("mchviewport");
      console.log(main);
      m.route(main, "/de", {
        "/de": {
          view: () => {
            return m(MainStage, m(DEView));
          }
        }
      });
    },
    view: () => {
      return m("mchview", m(TopBar), m("mchviewport"), m(BottomBar));
    }
  };
};

export default App;

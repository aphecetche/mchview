import m from "mithril";
import DEView from "../views/DEView";
import AllView from "../views/AllView";
import "./mchviewport.css";
const MchViewPort = () => {
  return {
    oncreate: vnode => {
      m.route(vnode.dom, "/de", {
        "/de": DEView,
        "/all": AllView
      });
    },
    view: () => {
      return m("mchviewport");
    }
  };
};

export default MchViewPort;

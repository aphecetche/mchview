import "./topbar.css";
import m from "mithril";
import OutlineSelector from "../selectors/OutlineSelector";
import ElementSelector from "../selectors/ElementSelector";
const TopBar = () => {
  const state = { coucou: "laurent" };
  return {
    /** Default view
     * @return {vnode} the top bar UI
     * */
    view: function() {
      return m("topbar", m(OutlineSelector), m(ElementSelector));
    }
  };
};

export default TopBar;

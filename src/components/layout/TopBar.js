import "./topbar.css";
import m from "mithril";
import OutlineSelector from "../selectors/OutlineSelector";
import ElementSelector from "../selectors/ElementSelector";
const TopBar = {
  /** Default view
   * @return {vnode} the top bar UI
   * */
  view: function() {
    return m(
      "header",
      { class: "topbar" },
      m(OutlineSelector),
      m(ElementSelector)
    );
  }
};

export default TopBar;

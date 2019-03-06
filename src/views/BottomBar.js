import "./css/bottombar.css";
import ShowModal from "../models/ShowModal";
import DataSourceCard from "./DataSourceCard";
import m from "mithril";

const dataSourceCreateButton = {
  view: () => {
    return m("button.dataSourceCreateButton", {
      innerHTML: "New Data Source",
      onclick: () => {
        ShowModal.visible = true;
      }
    });
  }
};

const BottomBar = {
  /** Default view
   * @return {vnode} the bottom bar UI
   * */
  view: function() {
    return m("footer.bottombar", m(dataSourceCreateButton), m(DataSourceCard));
  }
};

export default BottomBar;

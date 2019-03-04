import "./bottombar.css";
import ShowModal from "../models/ShowModal";
import m from "mithril";

const dataSourceCreateButton = {
  view: () => {
    return m(
      "button.dataSourceCreateButton",
      {
        onclick: () => {
          ShowModal.visible = !ShowModal.visible;
        }
      },
      "New Data Source"
    );
  }
};

const BottomBar = {
  /** Default view
   * @return {vnode} the bottom bar UI
   * */
  view: function() {
    return m("footer", { class: "bottombar" }, m(dataSourceCreateButton));
  }
};

export default BottomBar;

import "./bottombar.css";
import DataSourceSelector from "../selectors/DataSourceSelector";
import m from "mithril";

import DataSourceCreateButton from "../ui/DataSourceCreateButton";

const BottomBar = {
  /** Default view
   * @return {vnode} the bottom bar UI
   * */
  view: function() {
    return m(
      "footer.bottombar",
      m(DataSourceCreateButton),
      m(DataSourceSelector)
    );
  }
};

export default BottomBar;

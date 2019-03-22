import "./datasourcecreatebutton.css";
import ShowModal from "../../models/ShowModal";
import m from "mithril";

const DataSourceCreateButton = {
  view: () => {
    return m("button.dataSourceCreateButton", {
      innerHTML: "New Data Source",
      onclick: () => {
        ShowModal.visible = true;
      }
    });
  }
};

export default DataSourceCreateButton;

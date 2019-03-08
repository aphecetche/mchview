import m from "mithril";
import "./css/closebutton.css";
import ShowModal from "../models/ShowModal";

const CloseButton = {
  view: () => {
    return m(
      "button.close",
      {
        onclick: () => {
          ShowModal.visible = false;
        }
      },
      "Cancel"
    );
  }
};

export default CloseButton;

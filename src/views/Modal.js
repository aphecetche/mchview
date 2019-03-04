import "./modal.css";
import ShowModal from "../models/ShowModal";
import m from "mithril";

const ModalView = {
  view: () => {
    return m(
      ".modal",
      m(
        "main",
        m("p", "coucou je suis le modal"),
        m(
          "button",
          {
            onclick: () => {
              ShowModal.visible = false;
            }
          },
          "X"
        )
      )
    );
  }
};
const Modal = {
  view: () => {
    return ShowModal.visible ? m(ModalView) : null;
  }
};

export default Modal;

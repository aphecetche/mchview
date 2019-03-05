import m from "mithril";
import "./modal.css";
import CloseButton from "./CloseButton";
import FetchButton from "./FetchButton";
import Occupancy from "../models/Occupancy";
import ShowModal from "../models/ShowModal";
const ModalView = {
  view: () => {
    return m(
      ".modal",
      m(
        "main",
        m("header", m("h1", "Fetch Occupancy Map"), m(CloseButton)),
        m("fieldset", [
          m(
            "label",
            { for: "timestamp" },
            "Timestamp (run number for the moment)"
          ),
          m("input", {
            id: "timestamp",
            pattern: "[0-9]{6}",
            required: "required",
            size: "6",
            value: Occupancy.timestamp,
            onchange: e => {
              if (e.target.validity.valid) {
                Occupancy.timestamp = e.target.value;
              }
            }
          }),
          m("label", { for: "source_url" }, "Source URL"),
          m("input", {
            type: "text",
            id: "source_url",
            pattern: "https?://.+",
            placeholder: "https://",
            value: Occupancy.url,
            onchange: e => {
              if (e.target.validity.valid) {
                Occupancy.url = e.target.value;
              }
            }
          })
        ]),
        m(FetchButton)
      )
    );
  }
};

function Modal() {
  return {
    view: () => {
      return ShowModal.visible ? m(ModalView) : null;
    }
  };
}

export default Modal;

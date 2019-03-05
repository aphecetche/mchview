import "./modal.css";
import ShowModal from "../models/ShowModal";
import CloseButton from "./CloseButton";
import m from "mithril";

const Occupancy = {
  timestamp: 295820,
  url: "https://ccdb-api:3333"
};

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
        m("button.fetch", "Fetch")
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

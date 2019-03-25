import "./outlineselector.css";
import ShowOutline from "../../models/ShowOutline.js";
import m from "mithril";

const OutlineSelector = {
  oninit: () => {
    // might want to retrieve default starting state
    // from preferences (or previous use ?)
    console.log("state is " + state);
  },
  view: () => {
    return m(
      "outlineselector",
      m(
        "ul",
        { class: "outlineselector" },
        Object.keys(ShowOutline).map(function(u) {
          if (typeof ShowOutline[u] === "function") {
            return;
          }
          const c = ShowOutline[u] ? true : false;
          return m("li", [
            m("input[type=checkbox]", {
              id: u,
              checked: c,
              onclick: e => {
                ShowOutline[e.target.id] = !ShowOutline[e.target.id];
              }
            }),
            m("label", { for: u }, u)
          ]);
        }),
        m(
          "div",
          { class: "outlineselector-buttongroup" },
          m(
            "button",
            {
              onclick: () => {
                ShowOutline.setAll();
              },
              disabled: ShowOutline.all()
            },
            "All"
          ),
          m(
            "button",
            {
              onclick: () => {
                ShowOutline.setNone();
              },
              disabled: ShowOutline.none()
            },
            "None"
          )
        )
      )
    );
  }
};
export default OutlineSelector;

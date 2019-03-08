import m from "mithril";
import "./css/rightsidepanel.css";

function RightSidePanel() {
  let visible = false;

  return {
    view: () => {
      return m(
        ".rightsidepanel",
        m(".btn-right-panel", {
          class: visible ? "close" : "open",
          onclick: () => {
            visible = !visible;
          }
        }),
        m(".panelcontent", {
          class: visible ? "opened" : "closed"
        })
      );
    }
  };
}

export default RightSidePanel;

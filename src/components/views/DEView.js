import "./deview.css";
import m from "mithril";
import drawOutline from "./draw.js";
import Segmentation from "../../services/Segmentation";
import ShowElement from "../../models/ShowElement";

const DEView = () => {
  return {
    current: {},
    view: () => {
      return m(
        "deview",
        m("header"),
        m("main", { class: "deview" }),
        m("footer")
      );
    },
    oninit: function() {
      this.current.deid = ShowElement.deid;
      this.current.bending = ShowElement.bending;
    },
    oncreate: () => {
      Segmentation.loadData(ShowElement.deid, ShowElement.bending);
      drawOutline({ ds: true }, Segmentation);
    },
    onupdate: function() {
      if (
        this.current.deid != ShowElement.deid ||
        this.current.bending != ShowElement.bending
      ) {
        Segmentation.loadData(ShowElement.deid, ShowElement.bending);
      }
      this.current.deid = ShowElement.deid;
      this.current.bending = ShowElement.bending;
      drawOutline({ ds: true }, Segmentation);
    }
  };
};

export default DEView;

import "./deview.css";
import m from "mithril";
import drawOutline from "./draw.js";
import ShowOutline from "../../models/ShowOutline";
import Segmentation from "../../services/Segmentation";
import ShowElement from "../../models/ShowElement";

const DEView = () => {
  return {
    current: {},
    view: () => {
      return m("div", { class: "deview" }, m("header"));
    },
    oninit: function() {
      this.current.deid = ShowElement.deid;
      this.current.bending = ShowElement.bending;
    },
    oncreate: () => {
      Segmentation.loadData(ShowElement.deid, ShowElement.bending);
      console.log("oncreate" + JSON.stringify(ShowOutline));
      drawOutline(ShowOutline, Segmentation);
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
      drawOutline(ShowOutline, Segmentation);
    }
  };
};

export default DEView;

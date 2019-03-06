import m from "mithril";
import Occupancy from "../models/Occupancy";
import "./css/datasourcecard.css";

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

function DataSourceCard() {
  return {
    view: () => {
      return m("ul.datasourcecard", [
        m("li", Occupancy.url),
        m("li", Occupancy.timestamp),
        m("li", isEmpty(Occupancy.data) ? "NODATA" : "SOME DATA")
      ]);
    }
  };
}
export default DataSourceCard;

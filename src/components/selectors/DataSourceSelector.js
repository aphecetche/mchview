import m from "mithril";
import Occupancy from "../../models/Occupancy";
import "./datasourceselector.css";

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

function DataSourceSelector() {
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
export default DataSourceSelector;

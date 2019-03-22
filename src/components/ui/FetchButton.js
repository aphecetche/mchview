import m from "mithril";
import Occupancy from "../models/Occupancy";
import ShowModal from "../models/ShowModal";
import ShowElement from "../models/ShowElement";

const fetchOccupancy = (deid, timestamp, url) => {
  const qurl = url + "/occupancymap?deid=" + deid + "&run=" + timestamp;
  console.log("qurl=" + qurl);
  return m
    .request({
      method: "GET",
      url: qurl,
      background: true
    })
    .then(function(ds) {
      Occupancy.data = ds;
    });
};

function FetchButton() {
  let isLoading = false;
  let isError = false;
  return {
    view: () => {
      return m("button.fetch", {
        innerHTML: isLoading ? "Loading" : isError ? "Error" : "Fetch",
        class: isLoading ? "loading" : "",
        onclick: () => {
          isLoading = true;
          return fetchOccupancy(
            ShowElement.deid,
            Occupancy.timestamp,
            Occupancy.url
          ).then(
            () => {
              isLoading = false;
              ShowModal.visible = false;
              m.redraw();
              console.log("here");
            },
            () => {
              console.log("problem");
              isLoading = false;
              isError = true;
              m.redraw();
            }
          );
        }
      });
    }
  };
}

export default FetchButton;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectors as viewSelectors } from "../../ducks/view";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import DualSampaView from "./DualSampaView";
import "./deview.css";

const server = () => {
  return window.env.MCH_MAPPING_API;
};

const request = (deid, bending, what) => {
  const url =
    server() + "/" + what + "?deid=" + deid + "&" + "bending=" + bending;
  return fetch(url).then(response => response.json());
};

const DEView = ({ deid, bending, outline }) => {
  let [ds, setds] = useState([]);
  let [geo, setgeo] = useState({});

  useEffect(() => {
    const dsrequest = request(deid, bending, "dualsampas");
    const georequest = request(deid, bending, "degeo");
    Promise.all([dsrequest, georequest])
      .then(result => {
        setds(result[0].DualSampas);
        setgeo(result[1]);
        console.log(
          "mapping data successfully loaded from " +
            server() +
            " for DE " +
            deid +
            " " +
            (bending ? "B" : "NB")
        );
      })
      .catch(reason => {
        console.log(reason);
      });
  }, [deid, bending]);

  if (!geo.hasOwnProperty("X")) {
    return "";
  }
  return (
    <div className={"deview DE" + deid + (bending ? "B" : "NB")}>
      <main>
        <SVGView geo={geo} classname="dualsampa">
          {ds.map(x => (
            <DualSampaView key={x.ID} ds={x} fill={true} outline={outline.ds} />
          ))}
        </SVGView>
      </main>
    </div>
  );
};

DEView.propTypes = {
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired,
  outline: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  deid: viewSelectors.deid(state),
  bending: viewSelectors.bending(state),
  outline: state.outline
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DEView);

// const DEView = () => {
//   return {
//     current: {},
//     view: () => {
//       return m(
//         "deview",
//         m("header"),
//         m("main", { class: "deview" }),
//         m("footer")
//       );
//     },
//     oncreate: () => {
//       Segmentation.loadData(ShowElement.deid, ShowElement.bending);
//       drawOutline({ ds: true }, Segmentation);
//     },

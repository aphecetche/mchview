import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import DualSampaView from "./DualSampaView";
import styles from "./deview.css";
import AreaView from "./AreaView";

const server = () => {
  return window.env.MCH_MAPPING_API;
};

const request = (deid, bending, what) => {
  const url =
    server() + "/" + what + "?deid=" + deid + "&" + "bending=" + bending;
  return fetch(url).then(response => response.json());
};

const DEView = ({ deid, bending, outline, area }) => {
  let [ds, setds] = useState([]);
  let [geo, setgeo] = useState({});

  useEffect(() => {
    const dsrequest = request(deid, bending, "dualsampas");
    const georequest = request(deid, bending, "degeo");
    Promise.all([dsrequest, georequest])
      .then(result => {
        result[0].DualSampas.map(x => {
          x.Value = x.ID;
          console.log(x.Value, x.ID);
        });
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
    <div className={styles.deview}>
      <main>
        <SVGView geo={geo} classname={styles.dualsampa}>
          {ds.map(x => (
            <DualSampaView key={x.ID} ds={x} fill={true} outline={outline.ds} />
          ))}
          {outline.area ? <AreaView clip={geo} area={area} /> : null}
        </SVGView>
      </main>
    </div>
  );
};

DEView.propTypes = {
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired,
  outline: PropTypes.object.isRequired,
  area: PropTypes.shape({
    xmin: PropTypes.string.isRequired,
    ymin: PropTypes.string.isRequired,
    xmax: PropTypes.string.isRequired,
    ymax: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  deid: selectors.deid(state),
  bending: selectors.bending(state),
  outline: state.outline,
  area: state.area
});

export default connect(mapStateToProps)(DEView);

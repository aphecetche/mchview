import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import DualSampaView from "./DualSampaView";
import styles from "./deview.css";
import AreaView from "./AreaView";
import envelops from "../../services/envelops.js";

const DEView = ({ deid, bending, outline, area, data }) => {
  let [ds, setds] = useState([]);
  let [geo, setgeo] = useState({});

  useEffect(() => {
    const dsrequest = envelops.request(deid, bending, "dualsampas");
    const georequest = envelops.request(deid, bending, "degeo");
    Promise.all([dsrequest, georequest])
      .then(result => {
        setds(result[0].DualSampas);
        setgeo(result[1]);
      })
      .catch(reason => {
        console.log(reason);
      });
  }, [deid, bending, data]);

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
  }),
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  deid: selectors.deid(state),
  bending: selectors.bending(state),
  outline: state.outline,
  area: state.area,
  data: state.data
});

export default connect(mapStateToProps)(DEView);

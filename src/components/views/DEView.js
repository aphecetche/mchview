import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import DualSampaView from "./DualSampaView";
import PolygonView from "./PolygonView";
import styles from "./deview.css";
import AreaView from "./AreaView";
import envelops from "../../services/envelops.js";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const DEView = ({ deid, bending, outline, area, data, isFetching, de }) => {
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
        {isFetching ? (
          <Loader type="Watch" color="red" />
        ) : (
          <SVGView geo={geo} classname={styles.dualsampa}>
            {outline.ds
              ? ds.map(x => (
                  <DualSampaView
                    key={x.ID}
                    ds={x}
                  fill={true}
                    outline={outline.ds}
                  />
                ))
              : null}
            {outline.area ? <AreaView clip={geo} area={area} /> : null}
            {outline.de ? (
              <PolygonView poly={de} outline={true} fill={true} prefix="zob" />
            ) : null}
          </SVGView>
        )}
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
  data: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  deid: selectors.deid(state),
  bending: selectors.bending(state),
  outline: state.outline,
  area: state.area,
  data: state.data,
  isFetching: selectors.isFetching(
    state,
    selectors.deid(state),
    selectors.bending(state)
  ),
  de: selectors.degeo(state)
});

export default connect(mapStateToProps)(DEView);

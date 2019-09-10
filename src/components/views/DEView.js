import React from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import DualSampaView from "./DualSampaView";
import PolygonView from "./PolygonView";
import styles from "./deview.css";
import AreaView from "./AreaView";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";

const color = scaleSequential()
  .domain([100, 1025])
  .interpolator(interpolateViridis);

const DEView = ({ outline, area, data, isFetching, de, ds }) => {
  return (
    <div className={styles.deview}>
      <main>
        {isFetching ? (
          <Loader type="Watch" color="blue" />
        ) : (
          <SVGView geo={de} classname={styles.dualsampa}>
            {ds.map(x =>
              outline.ds ? (
                <DualSampaView
                  key={x.ID}
                  ds={x}
                  fill={true}
                  outline={outline.ds}
                />
              ) : null
            )}
            {outline.area ? <AreaView clip={de} area={area} /> : null}
            {outline.de ? (
              <PolygonView
                poly={de}
                styles={{ stroke: () => color(de.id) }}
                prefix="zob"
              />
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
  isFetching:
    selectors.isFetchingDualSampas(
      state,
      selectors.deid(state),
      selectors.bending(state)
    ) ||
    selectors.isFetchingDE(
      state,
      selectors.deid(state),
      selectors.bending(state)
    ),
  de: selectors.degeo(state),
  ds: []
});

export default connect(mapStateToProps)(DEView);

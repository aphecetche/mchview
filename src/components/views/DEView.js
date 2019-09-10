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

const colorDE = scaleSequential()
  .domain([100, 1025])
  .interpolator(interpolateViridis);

const colorDS = scaleSequential()
  .domain([0, 1500])
  .interpolator(interpolateViridis);

const DEView = ({ outline, area, data, isFetching, de, ds }) => {
  if (isFetching) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  let comp = [];

  if (outline.ds) {
    Object.keys(ds).forEach(key => {
      let single = ds[key];
      comp.push(
        <PolygonView
          key={"DS" + single.id}
          poly={single}
          styles={{
            strokeWidth: () => {
              return 0.2;
            },
            stroke: () => "black",
            fill: () => (single.value ? colorDS(single.value) : "none")
          }}
          prefix="DS"
        />
      );
    });
  }

  if (outline.de) {
    comp.push(
      <PolygonView
        key={"DS" + de.id}
        prefix="DE"
        poly={de}
        styles={{ stroke: () => colorDE(de.id) }}
      />
    );
  }

  if (outline.area) {
    comp.push(<AreaView key={"AREA"} clip={de} area={area} />);
  }

  return (
    <div className={styles.deview}>
      <main>
        <SVGView geo={de} classname={styles.dualsampa}>
          {comp}
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
  ds: selectors.degeo(state).dualsampas
});

export default connect(mapStateToProps)(DEView);

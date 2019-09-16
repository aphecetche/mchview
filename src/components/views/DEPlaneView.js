import React from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import PolygonView from "./PolygonView";
import styles from "./deview.css";
import AreaView from "./AreaView";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";
import { encode } from "../../categories";

const makeGroup = (groupname, style, children) => {
  return (
    <g className={groupname} key={groupname} style={style}>
      {children}
    </g>
  );
};

const addDELayer = (deplane, outlineStyle) => {
  const colorDE = scaleSequential()
    .domain([100, 1025])
    .interpolator(interpolateViridis);

  return makeGroup(
    "deplane",
    outlineStyle("deplane"),
    <PolygonView
      classname="deplane"
      key={encode(deplane.id)}
      prefix="DE"
      poly={deplane}
      fillColor={colorDE(420)}
    />
  );
};

const addDSLayer = (ds, outlineStyle) => {
  const dspoly = [];
  Object.keys(ds).forEach(key => {
    let single = ds[key];
    dspoly.push(
      <PolygonView
        classname="ds"
        key={encode(single.id)}
        poly={single}
        fillColor={colorDS(single.value)}
      />
    );
  });

  return makeGroup("ds", outlineStyle("ds"), dspoly);
};

const addAreaLayer = (area, de, outlineStyle) => {
  return makeGroup(
    "area",
    outlineStyle("area"),
    <AreaView key={"AREA"} clip={de} area={area} />
  );
};

const colorDS = scaleSequential()
  .domain([0, 1500])
  .interpolator(interpolateViridis);

const DEPlaneView = ({
  isVisible,
  outlineStyle,
  area,
  data,
  isFetching,
  deplane,
  ds
}) => {
  if (isFetching) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  let comp = [];

  //TODO: extract this to a separate component ?
  if (isVisible("deplane")) {
    comp.push(addDELayer(deplane, outlineStyle));
  }

  //TODO: extract this to a separate component ?
  if (isVisible("ds")) {
    comp.push(addDSLayer(ds, outlineStyle));
  }

  //TODO: extract this to a separate component ?
  if (isVisible("area")) {
    comp.push(addAreaLayer(area, deplane, outlineStyle));
  }

  return (
    <div className={styles.deview}>
      <main>
        <SVGView geo={deplane} classname={styles.deview}>
          {comp}
        </SVGView>
      </main>
    </div>
  );
};

DEPlaneView.propTypes = {
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired,
  isVisible: PropTypes.func.isRequired,
  outlineStyle: PropTypes.func.isRequired,
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
  isVisible: selectors.isVisible(state),
  outlineStyle: selectors.outlineStyle(state),
  area: state.area,
  data: state.data,
  isFetching:
    selectors.isFetchingDualSampas(
      state,
      selectors.deid(state),
      selectors.bending(state)
    ) ||
    selectors.isFetchingDEPlane(
      state,
      selectors.deid(state),
      selectors.bending(state)
    ),
  deplane: selectors.degeo(state),
  ds: selectors.degeo(state).dualsampas
});

export default connect(mapStateToProps)(DEPlaneView);

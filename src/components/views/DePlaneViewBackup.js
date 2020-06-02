import React from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import Polygon from "./Polygon";
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

const addDeLayer = (deplane, outlineStyle) => {
  const colorDE = scaleSequential()
    .domain([100, 1025])
    .interpolator(interpolateViridis);

  return makeGroup(
    "deplane",
    outlineStyle,
    <Polygon
      classname="deplane"
      key={encode(deplane.id)}
      prefix="DE"
      poly={deplane}
      fillColor={colorDE(420)}
    />
  );
};

const addDsLayer = (ds, outlineStyle) => {
  const dspoly = [];
  Object.keys(ds).forEach(key => {
    let single = ds[key];
    dspoly.push(
      <Polygon
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

const DePlane = ({ poly }) => {
  return addDeLayer(poly, {
    show: false,
    stroke: "#333333",
    strokeWidth: 0.7
  });
};

const colorDS = scaleSequential()
  .domain([0, 1500])
  .interpolator(interpolateViridis);

const DePlaneView = ({ isFetching, deplane }) => {
  if (isFetching) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  // let comp = [];
  //
  // //TODO: extract this to a separate component ?
  // if (isVisible("deplane") && deplane) {
  //   comp.push(addDeLayer(deplane, outlineStyle));
  // }
  //
  // //TODO: extract this to a separate component ?
  // if (isVisible("ds") && ds) {
  //   comp.push(addDsLayer(ds, outlineStyle));
  // }
  //
  // //TODO: extract this to a separate component ?
  // if (isVisible("area") && area) {
  //   comp.push(addAreaLayer(area, deplane, outlineStyle));
  // }

  return (
    <div className={styles.deview}>
      <main>
        <SVGView
          geo={deplane}
          classname={styles.deview}
          offset={{ left: 5, right: 5, top: 5, bottom: 5 }}
        >
          <DePlane deplane={deplane} />
          {/* <DualSampas /> */}
          {/* <Area /> */}
        </SVGView>
      </main>
    </div>
  );
};

DePlaneView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  deplane: PropTypes.object
};

const mapStateToProps = state => ({
  isFetching: selectors.isFetching(state),
  deplane: selectors.degeo(state)
});

export default connect(mapStateToProps)(DePlaneView);

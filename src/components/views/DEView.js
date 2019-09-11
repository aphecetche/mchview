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

const makeGroup = (groupname, style, children) => {
  return (
    <g className={groupname} key={groupname} style={style}>
      {children}
    </g>
  );
};

const colorDE = scaleSequential()
  .domain([100, 1025])
  .interpolator(interpolateViridis);

const colorDS = scaleSequential()
  .domain([0, 1500])
  .interpolator(interpolateViridis);

const DEView = ({
  isVisible,
  outlineStyle,
  area,
  data,
  isFetching,
  de,
  ds
}) => {
  if (isFetching) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  let comp = [];

  if (isVisible("de")) {
    comp.push(
      makeGroup(
        "de",
        outlineStyle("de"),
        <PolygonView
          classname="de"
          key={"DE" + de.id}
          prefix="DE"
          poly={de}
          fillColor={colorDS(420)}
        />
      )
    );
  }

  if (isVisible("ds")) {
    // const events = {
    //   onClick: e => console.log("CLICK DualSamp" + e.target.id),
    //   onMouseEnter: e => {
    //     console.log("Enter DualSampa" + e.target.id);
    //     console.log(e.target);
    //   }
    // };
    const dspoly = [];
    Object.keys(ds).forEach(key => {
      let single = ds[key];
      dspoly.push(
        <PolygonView
          classname="ds"
          key={"DS" + single.id}
          poly={single}
          fillColor={colorDS(single.value)}
          prefix="DS"
        />
      );
    });
    comp.push(makeGroup("ds", outlineStyle("ds"), dspoly));
  }

  if (isVisible("area")) {
    comp.push(<AreaView key={"AREA"} clip={de} area={area} />);
  }

  return (
    <div className={styles.deview}>
      <main>
        <SVGView geo={de} classname={styles.deview}>
          {comp}
        </SVGView>
      </main>
    </div>
  );
};

DEView.propTypes = {
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
    selectors.isFetchingDE(
      state,
      selectors.deid(state),
      selectors.bending(state)
    ),
  de: selectors.degeo(state),
  ds: selectors.degeo(state).dualsampas
});

export default connect(mapStateToProps)(DEView);

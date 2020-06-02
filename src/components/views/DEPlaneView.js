import React from "react";
import { connect } from "react-redux";
import { selectors } from "../../reducers";
import PropTypes from "prop-types";
import SVGView from "./SVGView";
import styles from "./deview.css";
import AreaView from "./AreaView";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DePlane from "../elements/DePlane";
import DualSampas from "../elements/DualSampas";

// const addAreaLayer = (area, de, outlineStyle) => {
//   return makeGroup(
//     "area",
//     outlineStyle("area"),
//     <AreaView key={"AREA"} clip={de} area={area} />
//   );
// };
//
// const colorDS = scaleSequential()
//   .domain([0, 1500])
//   .interpolator(interpolateViridis);

const DePlaneView = ({ isFetching, deplane, ds }) => {
  if (isFetching) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  return (
    <div className={styles.deview}>
      <main>
        <SVGView
          geo={deplane}
          classname={styles.deview}
          offset={{ left: 5, right: 5, top: 5, bottom: 5 }}
        >
          <DePlane deplane={deplane} />
          <DualSampas ds={ds} />
          {/* <Area /> */}
        </SVGView>
      </main>
    </div>
  );
};

DePlaneView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  deplane: PropTypes.object,
  ds: PropTypes.object
};

const mapStateToProps = state => ({
  isFetching: selectors.isFetching(state),
  deplane: selectors.degeo(state),
  ds: selectors.dualsampas(state)
});

export default connect(mapStateToProps)(DePlaneView);

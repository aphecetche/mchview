import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DePlane from "../elements/DePlane";
import DualSampas from "../elements/DualSampas";
import DePlaneSelector from "../selectors/DePlaneSelector";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import SVGView, { computeBBox } from "./SVGView";
import styles from "./deview.css";
import * as envelop from "../../ducks/envelop";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import AutoSizer from "react-virtualized-auto-sizer";

const useEnvelop = id => {
  const dispatch = useDispatch();

  let isLoading = useSelector(state => {
    return envelop.selectors.isLoading(state.envelop, id);
  });

  const geo = useSelector(state =>
    envelop.selectors.envelop(state.envelop, id)
  );

  useEffect(() => {
    if (!geo) {
      if (!isLoading) {
        dispatch(envelop.actions.fetch(id));
      }
    }
  }, [geo, isLoading, id]);

  return {
    isLoading,
    geo
  };
};

const DePlaneView = ({ id }) => {
  const history = useHistory();

  const viewerRef = useRef(null);
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    setViewer(viewerRef.current);
    console.log(viewer);
    if (viewer) {
      viewer.setPointOnViewerCenter(0, 0, 10);
    }
    //   console.log(viewer.current);
    //   // viewer.current.pan(xleft, ytop);
    //   // viewer.current.zoom(0, 0, 10);
    //   viewer.current.setPointOnViewerCenter(0, 0, 10);
  }, [id]);

  const { isLoading: isFetchingDePlane, geo: deplane } = useEnvelop(id);
  const { isLoading: isFetchingDualSampas, geo: ds } = useEnvelop({
    ...id,
    dsid: null
  });

  if (isFetchingDePlane === true || isFetchingDualSampas === true) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  if (!deplane) {
    return null;
  }
  const offset = { left: 5, right: 5, top: 5, bottom: 5 };

  const { w, h, left, top, vx, vy, xleft, ytop } = computeBBox(deplane, offset);

  console.log("w=", w, "h=", h, vx, vy);

  return (
    <div className={styles.deview}>
      <DePlaneSelector
        id={id}
        setDEID={(deid, bending) => {
          history.push({
            pathname: "/deplane",
            search: "?deid=" + deid + "&bending=" + bending
          });
        }}
      />
      <main style={{ height: "100vh" }}>
        <AutoSizer>
          {({ height, width }) => (
            <UncontrolledReactSVGPanZoom
              width={width}
              height={height}
              customToolbar={() => null}
              ref={viewerRef}
            >
              {/* <SVGView geo={deplane} classname={styles.deview} offset={offset}> */}
              <svg width={width} height={height}>
                <DePlane deplane={deplane} />
                {ds ? <DualSampas ds={ds.dualsampas} /> : null}
              </svg>
              {/* <Area /> */}
              {/* </SVGView> */}
            </UncontrolledReactSVGPanZoom>
          )}
        </AutoSizer>
      </main>
    </div>
  );
};

DePlaneView.propTypes = {
  id: PropTypes.object.isRequired
};

export default DePlaneView;

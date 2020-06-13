import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DePlane from "../elements/DePlane";
import DualSampas from "../elements/DualSampas";
import DePlaneSelector from "../selectors/DePlaneSelector";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import React, { useState } from "react";
import SVGView from "./SVGView";
import styles from "./deview.css";
import { useHistory } from "react-router-dom";
import SVGHighlighter from "../ui/SVGHighlighter";
import useEnvelop from "../../hooks/useEnvelop";
import OutlineSelector from "../selectors/OutlineSelector";
import * as categories from "../../categories";

const DePlaneView = ({ id }) => {
  const history = useHistory();

  const { isLoading: isFetchingDePlane, geo: deplane } = useEnvelop(id);
  const { isLoading: isFetchingDualSampas, geo: ds } = useEnvelop({
    ...id,
    dsid: null
  });

  const dsAvailable =
    isFetchingDualSampas === false && ds != null && ds.dualsampas != null;

  const [isDsVisible, setIsDsVisible] = useState(false);

  if (isFetchingDePlane === true || isFetchingDualSampas === true) {
    return <Loader className={styles.loader} key="loader" type="Watch" />;
  }

  let xoff = deplane ? -(deplane.x - deplane.sx / 2.0) : 0;
  let yoff = deplane ? -(deplane.y - deplane.sy / 2.0) : 0;

  const elements = [];
  // elements.push({
  //   name: categories.deplane.name,
  //   visible: true,
  //   available: deplane && deplane.vertices != null
  // });

  elements.push({
    name: categories.ds.name,
    visible: isDsVisible && dsAvailable,
    available: dsAvailable,
    toggle: () => {
      setIsDsVisible(v => !v);
    }
  });

  return (
    <div className={styles.deview}>
      <OutlineSelector elements={elements} />
      <DePlaneSelector
        id={id}
        setDEID={(deid, bending) => {
          history.push({
            pathname: "/deplane",
            search: "?deid=" + deid + "&bending=" + bending
          });
        }}
      />
      <main>
        <SVGView
          geo={deplane}
          classname={styles.deview}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          <DePlane deplane={deplane} />
          {isDsVisible && dsAvailable ? (
            <DualSampas ds={ds.dualsampas} />
          ) : null}
          {/* <Area /> */}
          <SVGHighlighter id={id} color="red" />
        </SVGView>
        {deplane ? null : <h1>something is wrong</h1>}
      </main>
    </div>
  );
};

DePlaneView.propTypes = {
  id: PropTypes.object.isRequired
};

export default DePlaneView;

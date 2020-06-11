import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DePlane from "../elements/DePlane";
import DualSampas from "../elements/DualSampas";
import DePlaneSelector from "../selectors/DePlaneSelector";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import React from "react";
import SVGView from "./SVGView";
import styles from "./deview.css";
import { useHistory } from "react-router-dom";
import SVGHighlighter from "../ui/SVGHighlighter";
import useEnvelop from "../../hooks/useEnvelop";

const DePlaneView = ({ id }) => {
  const history = useHistory();

  const { isLoading: isFetchingDePlane, geo: deplane } = useEnvelop(id);
  const { isLoading: isFetchingDualSampas, geo: ds } = useEnvelop({
    ...id,
    dsid: null
  });

  if (isFetchingDePlane === true || isFetchingDualSampas === true) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  let xoff = deplane ? -(deplane.x - deplane.sx / 2.0) : 0;
  let yoff = deplane ? -(deplane.y - deplane.sy / 2.0) : 0;

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
      <main>
        <SVGView
          geo={deplane}
          classname={styles.deview}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          <DePlane deplane={deplane} />
          {ds ? <DualSampas ds={ds.dualsampas} /> : null}
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

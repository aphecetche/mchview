import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DePlane from "../elements/DePlane";
import DualSampas from "../elements/DualSampas";
import DePlaneSelector from "../selectors/DePlaneSelector";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import SVGView from "./SVGView";
import styles from "./deview.css";
import * as envelop from "../../ducks/envelop";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SVGHighlighter from "../ui/SVGHighlighter";

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
  console.log("DePlaneView:id=", id);
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

  // if (deplane && id.deid < 500) {
  //   xoff += deplane.sx / 2.0;
  //   yoff += deplane.sy / 2.0;
  // }

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

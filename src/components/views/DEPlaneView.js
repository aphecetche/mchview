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
  const history = useHistory();

  const { isLoading: isFetchingDePlane, geo: deplane } = useEnvelop(id);
  const { isLoading: isFetchingDualSampas, geo: ds } = useEnvelop({
    ...id,
    dsid: null
  });

  if (isFetchingDePlane === true || isFetchingDualSampas === true) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

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
          offset={{ left: 5, right: 5, top: 5, bottom: 5 }}
        >
          <DePlane deplane={deplane} />
          {ds ? <DualSampas ds={ds.dualsampas} /> : null}
          {/* <Area /> */}
          <SVGHighlighter color="red" />
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

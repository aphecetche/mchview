import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DePlane from "../elements/DePlane";
import DePlaneSelector from "../selectors/DePlaneSelector";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import React from "react";
import SVGView from "./SVGView";
import styles from "./deview.css";
import { actions, envelopSelectors } from "../../ducks/envelop";
import { selectors } from "../../reducers";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const DePlaneView = ({ id }) => {
  const hasDePlane = useSelector(state => selectors.hasDePlane(state, id));

  let isFetchingDePlane = useSelector(state =>
    selectors.isFetchingDePlane(state, id)
  );
  const deplane = useSelector(state => selectors.deplane(state, id));
  const dispatch = useDispatch();
  const history = useHistory();

  if (!hasDePlane) {
    if (!isFetchingDePlane) {
      dispatch(actions.fetchDePlane(id));
    }
  }

  if (isFetchingDePlane === true) {
    return <Loader key="loader" type="Watch" color="blue" />;
  }

  // if (!deplane) {
  //   return null;
  // }

  return (
    <div className={styles.deview}>
      {/* {msg} */}
      <DePlaneSelector
        id={id}
          setDEID={(deid, bending) => {
                  console.log("setDEID: deid="+deid+"bending="+bending);
          history.push({
            pathname: "/deplane",
            search: "?deid=" + deid + "&bending=" + bending
          })
          }
        }
      />
      <main>
        <SVGView
          geo={deplane}
          classname={styles.deview}
          offset={{ left: 5, right: 5, top: 5, bottom: 5 }}
        >
          <DePlane deplane={deplane} />
          {/* <DualSampas ds={ds} /> */}
          {/* <Area /> */}
        </SVGView>
      </main>
    </div>
  );
};

DePlaneView.propTypes = {
  id: PropTypes.object.isRequired
};

export default DePlaneView;

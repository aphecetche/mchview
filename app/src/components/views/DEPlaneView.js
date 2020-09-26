import DePlane from "../elements/DePlane";
import DualSampas from "../elements/DualSampas";
import DePlaneSelector from "../selectors/DePlaneSelector";
import PropTypes from "prop-types";
import React, { useState } from "react";
import SVGView from "./SVGView";
import { useHistory } from "react-router-dom";
import SVGHighlighter from "../ui/SVGHighlighter";
import useEnvelop from "../../hooks/useEnvelop";
import OutlineSelector from "../selectors/OutlineSelector";
import * as categories from "../../categories";
//import OutlineStyleSelector from "../selectors/OutlineStyleSelector";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Cluster from "../elements/Cluster";
import pads from "../../store/cluster.json";
import Alert from "@material-ui/lab/Alert";

{
  /* <OutlineStyleSelector */
}
{
  /*   value={deOutlineStyle.strokeWidth} */
}
{
  /*   onChange={value => { */
}
{
  /*     setDeOutlineStyle({ ...deOutlineStyle, strokeWidth: value }); */
}
{
  /*   }} */
}
{
  /* /> */
}

const cluster = {
  ...pads
};

const ErrorMessage = ({ message }) => <Alert severity="error">{message}</Alert>;

const DePlaneView = ({ id }) => {
  const history = useHistory();

  const {
    isLoading: isFetchingDePlane,
    isError: isErrorDePlane,
    geo: deplane
  } = useEnvelop(id);
  const {
    isLoading: isFetchingDualSampas,
    isError: isErrorDualSampas,
    geo: ds
  } = useEnvelop({
    ...id,
    dsid: null
  });

  const [deOutlineStyle, setDeOutlineStyle] = useState({
    stroke: "lightpink",
    strokeWidth: 0.7
  });

  const [dsOutlineStyle, setDsOutlineStyle] = useState({
    stroke: "lightblue",
    strokeWidth: 0.5
  });

  const dsAvailable = isFetchingDualSampas === false && ds != null;

  const dePlaneAvailable = isFetchingDePlane === false && deplane != null;

  const clusterAvailable = true;

  const [isDsVisible, setIsDsVisible] = useState(false);
  const [isDePlaneVisible, setIsDePlaneVisible] = useState(true);
  const [isClusterVisible, setIsClusterVisible] = useState(true);

  if (isErrorDePlane === true || isErrorDualSampas === true) {
    return (
      <ErrorMessage message="Could not get data : is the mapping API alive ?" />
    );
  }

  if (isFetchingDePlane === true || isFetchingDualSampas === true) {
    return <CircularProgress />;
  }

  let xoff = deplane ? -(deplane.x - deplane.sx / 2.0) : 0;
  let yoff = deplane ? -(deplane.y - deplane.sy / 2.0) : 0;

  const elements = [];
  elements.push({
    name: categories.deplane.name,
    visible: isDePlaneVisible && dePlaneAvailable,
    available: dePlaneAvailable,
    toggle: () => {
      setIsDePlaneVisible(v => !v);
    }
  });

  elements.push({
    name: categories.ds.name,
    visible: isDsVisible && dsAvailable,
    available: dsAvailable,
    toggle: () => {
      setIsDsVisible(v => !v);
    }
  });

  elements.push({
    name: categories.cluster.name,
    visible: isClusterVisible && clusterAvailable,
    available: clusterAvailable,
    toggle: () => {
      setIsClusterVisible(v => !v);
    }
  });

  return (
    <div>
      <Box display="flex">
        <OutlineSelector elements={elements} />
        <DePlaneSelector
          id={id}
          setId={({ deid, bending }) => {
            history.push({
              pathname: "/deplane",
              search: "?deid=" + deid + "&bending=" + bending
            });
          }}
        />
      </Box>
      <main>
        <SVGView
          geo={deplane}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          {isDePlaneVisible && (
            <DePlane outlineStyle={deOutlineStyle} deplane={deplane} />
          )}
          {isDsVisible && dsAvailable ? (
            <DualSampas outlineStyle={dsOutlineStyle} ds={ds} />
          ) : null}
          {isClusterVisible && clusterAvailable ? (
            <>
              <Cluster bending={id.bending} cluster={cluster} />
              <Cluster bending={!id.bending} cluster={cluster} />
            </>
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

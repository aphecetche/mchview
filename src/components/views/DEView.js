import React from "react";
import DePlaneView from "./DePlaneView";

const DeView = ({ id }) => {
  return (
    <React.Fragment>
      <DePlaneView id={{ deid: id.deid, bending: false }} />
      <DePlaneView id={{ deid: id.deid, bending: true }} />
    </React.Fragment>
  );
};

export default DeView;

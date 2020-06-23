import React from "react";

const SVGGroup = ({ groupname, style, children }) => {
  return (
    <g className={groupname} key={groupname} style={style}>
      {children}
    </g>
  );
};

export default SVGGroup;

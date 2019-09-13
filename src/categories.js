import { isEmpty } from "lodash";

// constants
const Categories = {
  chamber: { name: "Chamber" },
  de: {
    name: "Detection Element"
  },
  deplane: {
    name: "Detection Element Plane"
  },
  ds: {
    name: "Dual Sampa"
  },
  pad: {
    name: "Pad"
  },
  cluster: {
    name: "Cluster"
  },
  area: {
    name: "Area"
  }
};

Object.freeze(Categories);

export { Categories };

export const whatis = id => {
  if (id === undefined) {
    return undefined;
  }
  if (isEmpty(id)) {
    return undefined;
  }
  if (id.hasOwnProperty("clusterid") && id.hasOwnProperty("deid")) {
    return Categories.cluster;
  }
  if (
    id.hasOwnProperty("deid") &&
    id.hasOwnProperty("bending") &&
    id.hasOwnProperty("dsid") &&
    id.hasOwnProperty("padid")
  ) {
    return Categories.pad;
  }
  if (
    id.hasOwnProperty("deid") &&
    id.hasOwnProperty("bending") &&
    id.hasOwnProperty("dsid")
  ) {
    return Categories.ds;
  }
  if (id.hasOwnProperty("bending") && id.hasOwnProperty("deid")) {
    return Categories.deplane;
  }
  if (id.hasOwnProperty("deid")) {
    return Categories.de;
  }
  if (id.hasOwnProperty("chid")) {
    return Categories.chamber;
  }
  return undefined;
};

export const isvalid = id => {
  //TODO: get the real values from the mapping API at startup instead
  const w = whatis(id);
  if (w === Categories.de) {
    return !(isNaN(id.deid) || id.deid === null);
  }
  if (w === Categories.deplane) {
    return !(isNaN(id.deid) || id.bending === null || id.deid === null);
  }
  if (w === Categories.ds) {
    return !(isNaN(id.dsid) || id.dsid === null);
  }
  return false;
};

export const describe = id => {
  const w = whatis(id);
  if (w === undefined) {
    return "undefined id";
  }
  let rv = w.name;
  if (!isvalid(id)) {
    return rv;
  }
  if (w === Categories.de) {
    rv += " " + id.deid;
  }
  if (w === Categories.deplane) {
    rv += " " + id.deid + " (" + (id.bending ? "Bending" : "Non-Bending") + ")";
  }
  if (w === Categories.ds) {
    rv =
      describe({ deid: id.deid, bending: id.bending }) +
      " " +
      w.name +
      " " +
      id.dsid;
  }
  return rv;
};

export const encode = id =>
  describe(id)
    .toLowerCase()
    .replace(/ /g, "-");

export default Categories;

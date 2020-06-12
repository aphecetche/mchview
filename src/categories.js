import { isEmpty, isEqual } from "lodash";
// constants
const chamber = { name: "Chamber", key: "chamber" };

const de = {
  name: "Detection Element",
  key: "de"
};
const deplane = {
  name: "Detection Element Plane",
  key: "deplane"
};
const ds = {
  name: "Dual Sampa",
  key: "ds"
};
const pad = {
  name: "Pad",
  key: "pad"
};
const cluster = {
  name: "Cluster",
  key: "cluster"
};
const area = {
  name: "Area",
  key: "area"
};

export const isValidCategory = c => {
  return (
    isEqual(c, de) ||
    isEqual(c, ds) ||
    isEqual(c, deplane) ||
    isEqual(c, chamber) ||
    isEqual(c, cluster) ||
    isEqual(c, area)
  );
};

export const isSpecific = id => {
  const w = whatis(id);
  if (w === undefined) {
    return false;
  }
  switch (w) {
    case de:
      return id.deid !== null;
    case deplane:
      return id.bending !== null;
    case ds:
      return id.dsid !== null;
    default:
      throw "not implemented";
  }
};

export const whatis = id => {
  if (id === undefined) {
    return undefined;
  }
  if (isEmpty(id)) {
    return undefined;
  }
  if (id.hasOwnProperty("clusterid") && id.hasOwnProperty("deid")) {
    return cluster;
  }
  if (
    id.hasOwnProperty("deid") &&
    id.hasOwnProperty("bending") &&
    id.hasOwnProperty("dsid") &&
    id.hasOwnProperty("padid")
  ) {
    return pad;
  }
  if (
    id.hasOwnProperty("deid") &&
    id.hasOwnProperty("bending") &&
    id.hasOwnProperty("dsid")
  ) {
    return ds;
  }
  if (id.hasOwnProperty("bending") && id.hasOwnProperty("deid")) {
    return deplane;
  }
  if (id.hasOwnProperty("deid")) {
    return de;
  }
  if (id.hasOwnProperty("chid")) {
    return chamber;
  }
  return undefined;
};

export const listOfValidDeIds = [
  100,
  101,
  102,
  103,
  200,
  201,
  202,
  203,
  300,
  301,
  302,
  303,
  400,
  401,
  402,
  403,
  500,
  501,
  502,
  503,
  504,
  505,
  506,
  507,
  508,
  509,
  510,
  511,
  512,
  513,
  514,
  515,
  516,
  517,
  600,
  601,
  602,
  603,
  604,
  605,
  606,
  607,
  608,
  609,
  610,
  611,
  612,
  613,
  614,
  615,
  616,
  617,
  700,
  701,
  702,
  703,
  704,
  705,
  706,
  707,
  708,
  709,
  710,
  711,
  712,
  713,
  714,
  715,
  716,
  717,
  718,
  719,
  720,
  721,
  722,
  723,
  724,
  725,
  800,
  801,
  802,
  803,
  804,
  805,
  806,
  807,
  808,
  809,
  810,
  811,
  812,
  813,
  814,
  815,
  816,
  817,
  818,
  819,
  820,
  821,
  822,
  823,
  824,
  825,
  900,
  901,
  902,
  903,
  904,
  905,
  906,
  907,
  908,
  909,
  910,
  911,
  912,
  913,
  914,
  915,
  916,
  917,
  918,
  919,
  920,
  921,
  922,
  923,
  924,
  925,
  1000,
  1001,
  1002,
  1003,
  1004,
  1005,
  1006,
  1007,
  1008,
  1009,
  1010,
  1011,
  1012,
  1013,
  1014,
  1015,
  1016,
  1017,
  1018,
  1019,
  1020,
  1021,
  1022,
  1023,
  1024,
  1025
];

export const isValidDeId = deid => {
  if (isNaN(deid)) {
    return false;
  }
  return listOfValidDeIds.includes(parseInt(deid, 10));
};

export const isvalid = id => {
  //TODO: get the real values from the mapping API at startup instead
  const w = whatis(id);
  if (w === de) {
    return isValidDeId(id.deid);
  }
  if (w === deplane) {
    return isValidDeId(id.deid) && id.bending !== null;
  }
  if (w === ds) {
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
  if (w === de) {
    rv += " " + id.deid;
  }
  if (w === deplane) {
    rv +=
      " " +
      id.deid +
      " (" +
      (id.bending == "true" || id.bending === true
        ? "Bending"
        : "Non-Bending") +
      ")";
  }
  if (w === ds) {
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

export { de, deplane, chamber, area, cluster, ds, pad };
export const all = [de, deplane, chamber, area, cluster, ds, pad];

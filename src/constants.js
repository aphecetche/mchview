// const PartNames = {
//   Chamber: "chamber",
//   DetectionElement: "de",
//   DualSampa: "ds",
//   Pad: "pad"
// };
//
// Object.freeze(PartNames);
//
// export { PartNames };
//
const LayerCategories = [
  {
    key: "chamber",
    name: "Chamber"
  },
  {
    key: "de",
    name: "Detection Element"
  },
  {
    key: "ds",
    name: "Dual Sampa"
  },
  {
    key: "pad",
    name: "Pad"
  },
  {
    key: "cluster",
    name: "Cluster"
  },
  {
    key: "area",
    name: "Area"
  }
];

Object.freeze(LayerCategories);

export { LayerCategories };

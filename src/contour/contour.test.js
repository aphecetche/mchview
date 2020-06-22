import * as contour from "./contour";
import * as gjv from "geojson-validation";
import expect from "expect";
import pads from "./pads.json";

describe("vertices2geojson", () => {
  test("pad2polygon", () => {
    const pol = contour.vertices2polygon(pads.pads["500-1-31"].vertices);
    const trace = gjv.isPolygon(pol, true);
    expect(trace).toBeEmpty();
  });
  test("cluster2multipolygon", () => {
    const multipol = {
      type: "MultiPolygon",
      coordinates: [
        contour.vertices2coordinates(pads.pads["500-1-31"].vertices),
        contour.vertices2coordinates(pads.pads["500-1-48"].vertices),
        contour.vertices2coordinates(pads.pads["500-1-49"].vertices),
        contour.vertices2coordinates(pads.pads["500-1-50"].vertices)
      ]
    };
    const trace = gjv.isMultiPolygon(multipol, true);
    expect(trace).toBeEmpty();
  });
});

describe("union", () => {
  const m = contour.cluster2contour(pads);
  console.log("m=", JSON.stringify(m));
});

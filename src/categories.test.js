import expect from "expect";
import * as categories from "./categories";

describe("categories.whatis", () => {
  it("deid should be de", () => {
    expect(categories.whatis({ deid: null })).toBe(categories.Categories.de);
  });
  it("deid,bending should be detection element plane", () => {
    expect(categories.whatis({ deid: null, bending: null })).toBe(
      categories.Categories.deplane
    );
  });
  it("deid,bending,dsid should be dual sampa", () => {
    expect(categories.whatis({ deid: null, bending: null, dsid: null })).toBe(
      categories.Categories.ds
    );
  });
  it("deid:null,bending:null,dsid:null should be dual sampa", () => {
    expect(categories.whatis({ deid: null, bending: null, dsid: null })).toBe(
      categories.Categories.ds
    );
  });
});

describe("isvalid", () => {
  it("deid:null should be invalid", () => {
    expect(categories.isvalid({ deid: null })).toBe(false);
  });
  it("deid:501 should be valid", () => {
    expect(categories.isvalid({ deid: 501 })).toBe(true);
  });
  it("deid:null,bending:null,dsid:null should be invalid", () => {
    expect(categories.isvalid({ deid: null, bending: null, dsid: null })).toBe(
      false
    );
  });
  it("deid:501,bending:true,dsid:2 should be valid", () => {
    expect(categories.isvalid({ deid: 501, bending: true, dsid: 2 })).toBe(
      true
    );
  });
});

describe("describe", () => {
  it("deid:null should be Detection Element", () => {
    expect(categories.describe({ deid: null })).toBe("Detection Element");
  });
  it("deid:501 should be Detection Element 501", () => {
    expect(categories.describe({ deid: 501 })).toBe("Detection Element 501");
  });
  it("deid:null,bending:null should be Detection Element Plane", () => {
    expect(categories.describe({ deid: null, bending: null })).toBe(
      "Detection Element Plane"
    );
  });
  it("deid:501,bending:true should be Detection Element Plane 501 (Bending)", () => {
    expect(categories.describe({ deid: 501, bending: true })).toBe(
      "Detection Element Plane 501 (Bending)"
    );
  });
  it("deid:501,bending:false should be Detection Element Plane 501 (Non-Bending)", () => {
    expect(categories.describe({ deid: 501, bending: false })).toBe(
      "Detection Element Plane 501 (Non-Bending)"
    );
  });
  it("deid:null,bending:null,dsid:null should be Dual Sampa", () => {
    expect(categories.describe({ deid: null, bending: null, dsid: null })).toBe(
      "Dual Sampa"
    );
  });
  it("deid:501,bending:true,dsid:2 should be Detection Element Plane 501 (Bending) Dual Sampa 2", () => {
    expect(categories.describe({ deid: 501, bending: true, dsid: 2 })).toBe(
      "Detection Element Plane 501 (Bending) Dual Sampa 2"
    );
  });
});

describe("replace", () => {
  it("shoud replace space", () => {
    expect("a b c".replace(/ /g, "-")).toBe("a-b-c");
  });
});

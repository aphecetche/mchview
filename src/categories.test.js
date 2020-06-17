import expect from "expect";
import * as categories from "./categories";

describe("isValidCategory", () => {
  it("{de,Detection Element} should be a valid category", () => {
    expect(
      categories.isValidCategory({
        key: categories.de.key,
        name: categories.de.name
      })
    ).toBe(true);
  });
});

describe("whatis", () => {
  it("deid should be de", () => {
    expect(categories.whatis({ deid: null })).toBe(categories.de);
    expect(categories.whatis({ deid: undefined })).toBe(categories.de);
    expect(categories.whatis({ deid: "toto" })).toBe(categories.de);
    expect(categories.whatis({ deid: 1025 })).toBe(categories.de);
  });
  it("deid,bending should be detection element plane", () => {
    expect(categories.whatis({ deid: null, bending: null })).toBe(
      categories.deplane
    );
  });
  it("deid,dsid should be dual sampa", () => {
    expect(categories.whatis({ deid: null, dsid: null })).toBe(categories.ds);
  });
  it("deid,bending,dsid should be dual sampa", () => {
    expect(categories.whatis({ deid: null, bending: null, dsid: null })).toBe(
      categories.ds
    );
  });
  it("deid:null,bending:null,dsid:null should be dual sampa", () => {
    expect(categories.whatis({ deid: null, bending: null, dsid: null })).toBe(
      categories.ds
    );
  });
});

describe("isValid", () => {
  it("deid:null should be invalid", () => {
    expect(categories.isValid({ deid: null })).toBe(false);
  });
  it("deid:501 should be valid", () => {
    expect(categories.isValid({ deid: 501 })).toBe(true);
  });
  it("deid:100 should be valid", () => {
    expect(categories.isValid({ deid: 100 })).toBe(true);
  });
  it("deid:104 should be invalid", () => {
    expect(categories.isValid({ deid: 104 })).toBe(false);
  });
  it("deid:null,bending:null,dsid:null should be invalid", () => {
    expect(categories.isValid({ deid: null, bending: null, dsid: null })).toBe(
      false
    );
  });
  it("deid:501,bending:true,dsid:2 should be valid", () => {
    expect(categories.isValid({ deid: 501, bending: true, dsid: 2 })).toBe(
      true
    );
  });
});

describe("nameAll", () => {
  it("deid:null should be All Detection Elements", () => {
    expect(categories.nameAll({ deid: null })).toBe("All Detection Elements");
  });
  it("deid:null bending:null should be All Planes", () => {
    expect(categories.nameAll({ deid: null, bending: null })).toBe(
      "All Planes"
    );
  });
  it("deid:null bending:null dsid:null should be All Dual Sampas", () => {
    expect(categories.nameAll({ deid: null, bending: null, dsid: null })).toBe(
      "All Dual Sampas"
    );
  });
  it("deid:null dsid:null should be All Dual Sampas", () => {
    expect(categories.nameAll({ deid: null, dsid: null })).toBe(
      "All Dual Sampas"
    );
  });
  it("deid:510 dsid:null should be Detection Element 510 All Dual Sampas", () => {
    expect(categories.nameAll({ deid: 510, dsid: null })).toBe(
      "Detection Element 510 All Dual Sampas"
    );
  });
});

describe("describe", () => {
  it("deid:null should be All Detection Elements", () => {
    expect(categories.describe({ deid: null })).toBe("All Detection Elements");
  });
  it("deid:501 should be Detection Element 501", () => {
    expect(categories.describe({ deid: 501 })).toBe("Detection Element 501");
  });
  it("deid:null,bending:null should be All Planes", () => {
    expect(categories.describe({ deid: null, bending: null })).toBe(
      "All Planes"
    );
  });
  it("deid:501,bending:true should be Detection Element Plane 501 (Bending)", () => {
    expect(categories.describe({ deid: 501, bending: true })).toBe(
      "Detection Element 501 Bending Plane"
    );
  });
  it("deid:501,bending:false should be Detection Element Plane 501 (Non-Bending)", () => {
    expect(categories.describe({ deid: 501, bending: false })).toBe(
      "Detection Element 501 Non-Bending Plane"
    );
  });
  it("deid:null,bending:null,dsid:null should be All Dual Sampas", () => {
    expect(categories.describe({ deid: null, bending: null, dsid: null })).toBe(
      "All Dual Sampas"
    );
  });
  it("deid:501,dsid:null should be Detection Element 501 all ds", () => {
    expect(categories.describe({ deid: 501, dsid: null })).toBe(
      "Detection Element 501 All Dual Sampas"
    );
  });
  it("deid:501,bending:true,dsid:2 should be Detection Element Plane 501 (Bending) Dual Sampa 2", () => {
    expect(categories.describe({ deid: 501, bending: true, dsid: 2 })).toBe(
      "Detection Element 501 Bending Plane Dual Sampa 2"
    );
  });
});

describe("replace", () => {
  it("shoud replace space", () => {
    expect("a b c".replace(/ /g, "-")).toBe("a-b-c");
  });
});

describe("isSpecific", () => {
  it("deid:null should not be specific", () => {
    expect(categories.isSpecific({ deid: null })).toBe(false);
  });
  it("deid:501 should be specific", () => {
    expect(categories.isSpecific({ deid: 501 })).toBe(true);
  });
  it("deid:501 bending:null should not be specific", () => {
    expect(categories.isSpecific({ deid: 501, bending: null })).toBe(false);
  });
  it("deid:501 bending:true should be specific", () => {
    expect(categories.isSpecific({ deid: 501, bending: true })).toBe(true);
  });
  it("deid:501 bending:false dsid should not be specific", () => {
    expect(
      categories.isSpecific({ deid: 501, bending: false, dsid: null })
    ).toBe(false);
  });
  it("deid:501 dsid:null should not be specific", () => {
    expect(categories.isSpecific({ deid: 501, dsid: null })).toBe(false);
  });
  it("deid:501 dsid:1024 should be specific", () => {
    expect(categories.isSpecific({ deid: 501, dsid: 1024 })).toBe(true);
  });
});

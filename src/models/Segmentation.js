import m from "mithril";

const server = () => {
  return "http://localhost:" + process.env.MCH_MAPPING_API_PORT;
};

const request = (deid, bending, what) => {
  const url =
    server() + "/" + what + "?deid=" + deid + "&" + "bending=" + bending;
  return m.request({
    method: "GET",
    url: url
  });
};

const Segmentation = {
  degeo: {},
  dualSampas: [],
  loadData: (deid, bending) => {
    console.log("mapping server expected at " + server());
    const ds = request(deid, bending, "dualsampas");
    const geo = request(deid, bending, "degeo");
    Promise.all([ds, geo]).then(result => {
      Segmentation.dualSampas = result[0].DualSampas;
      Segmentation.degeo = result[1];
    });
  }
};

export default Segmentation;

import m from 'mithril';

const server = process.env.APIURL;

const request = (deid, bending, what) => {
  const url= server + '/' + what + '?deid=' + deid + '&' + 'bending=' + bending;
  return m.request({
    method: 'GET',
    url: url
  });
};

const Segmentation = {
  degeo: {},
  dualSampas: [],
  loadData: (deid, bending) => {
    const ds = request(deid, bending, 'dualsampas');
    const geo = request(deid, bending, 'degeo');
    Promise.all([ds, geo]).then((result) => {
      Segmentation.dualSampas = result[0].DualSampas;
      Segmentation.degeo = result[1];
    });
  }
};

export default Segmentation;

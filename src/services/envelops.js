const server = () => {
  return window.env.MCH_MAPPING_API;
};
const envelops = {
  request: (deid, bending, what) => {
    const url =
      server() + "/" + what + "?deid=" + deid + "&" + "bending=" + bending;
    return fetch(url).then(response => response.json());
  }
};
export default envelops;

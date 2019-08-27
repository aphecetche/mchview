const { TObject2JsonClient } = require("@aliceo2/qc");

const client = new TObject2JsonClient("ccdb", {
  hostname: "ccdb-test.cern.ch",
  port: 8080
});

const test1 = "QcTaskMCH/QcMuonChambers_Pedestals_DS39/1564581527418";

const test2 = "QcTaskMCH/QcMuonChambers_Noise_00/1566827328236";

const test3 = "QcTaskMCH/QcMuonChambers_Noise_DE819/1566834581022";

const test4 = "QcTaskMCH/QcMuonChambers_Noise_00_00/1566835421911";

client.retrieve(test4).then(data => {
  console.log(JSON.stringify(data));
});

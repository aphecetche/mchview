import * as express from "express";
import { Log } from "@aliceo2/web-ui";
const log = new Log("MCHVIEW-SERVER");
const { TObject2JsonClient } = require("@aliceo2/qc");

const config = {
  http: {
    port: 4242,
    hostname: "localhost"
  },
  ccdb: {
    hostname: "ccdb-test.cern.ch",
    port: 8080
  }
};

const client = new TObject2JsonClient("ccdb", config.ccdb);

const app = express();

app.get("/", function(req, res) {
  toto(req, res);
});

app.listen(config.http.port, function() {
  console.log("Example app listening on port 3000!");
});

/**
 *  * List all objects without data
 *   * @param {Request} req
 *    * @param {Response} res
 *     */
const toto = (req, res) => {
  client
    .retrieve("QcTaskMCH/QcMuonChambers_Pedestals_DS39/1564581527418")
    .then(data => {
      res.json({ DsId: data.fLineColor });
    })
    .catch(err => errorHandler(err, res));
};

/**
 *  * Global HTTP error handler, sends status 500
 *   * @param {string} err - Message error
 *    * @param {Response} res - Response object to send to
 *     * @param {number} status - status code 4xx 5xx, 500 will print to debug
 *      */
function errorHandler(err, res, status = 500) {
  if (status === 500) {
    if (err.stack) {
      log.trace(err);
    }
    log.error(err.message || err);
  }
  res.status(status).send({ message: err.message || err });
}

// needed so nodemon will work
var process = require("process");

process.once("SIGUSR2", function() {
  console.log("Killed via SIGUSR2");
  // Graceful cleanup & shutdown
  process.exit(0); // Exit successfully
});

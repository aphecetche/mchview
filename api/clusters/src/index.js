import express from "express";
const app = express();
const port = 3208;

const handleClusters = (req, res) => {
  res.json({
    type: "Feature",
    id: 42,
    geometry: "Polygon"
  });
};

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/clusters", (req, res) => handleClusters(req, res));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

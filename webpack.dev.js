const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    publicPath: "/",
    contentBase: path.resolve(__dirname, "./"),
    watchContentBase: true,
    host: "0.0.0.0"
  }
});

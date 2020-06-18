const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  target: "node",
  mode: "development",
  entry: {
    app: "./cli/write-envelop"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name]-cli.js"
  },
  plugins: [new NodemonPlugin()],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.node$/,
        use: "node-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {}
        }
      }
    ]
  }
};

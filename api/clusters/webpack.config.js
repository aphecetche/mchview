const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  entry: ["./src/index.js"],
  target: "node",
  devServer: {
    contentBase: "./dist"
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new NodemonPlugin()]
};

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "app.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["dist/*"]),
    new webpack.EnvironmentPlugin({ APIURL: "http://localhost:8080" }),
    new HtmlWebpackPlugin({ title: "MchView 2.0 Proto" })
  ]
};

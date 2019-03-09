const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    config: "./src/config.js",
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name].js"
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
    new HtmlWebpackPlugin({ title: "MchView 2.0 Proto" })
  ]
};

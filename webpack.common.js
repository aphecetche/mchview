const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    config: "./src/config.js",
    app: "./src/index.js",
    play: "./src/play.js"
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
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["dist/*"]),
    new HtmlWebpackPlugin({
      title: "MchView 2.0 Proto",
      template: "src/index.html"
    })
  ]
};

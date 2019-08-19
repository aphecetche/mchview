const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        test: /\.node$/,
        use: "node-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader",
            options: { modules: true }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                "module-resolver",
                {
                  root:
                    "/Users/laurent/alice/qc/sw/osx_x86-64/qcg/v1.5.1-1/node_modules"
                }
              ]
            ]
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
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

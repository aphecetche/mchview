const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  target: "node",
  mode: "development",
  entry: {
    app: "./server/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name]-backend.js"
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
  }
};

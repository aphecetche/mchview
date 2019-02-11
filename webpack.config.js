
const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build/assets'),
    filename: 'app.js'
  },

  devServer: {
    publicPath: '/assets/',
    contentBase: path.resolve(__dirname, './'),
    watchContentBase: true,
    host: '0.0.0.0'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin({APIURL: 'http://localhost:8080'})
  ]
};

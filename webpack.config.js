const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");

const DEV = process.env.NODE_ENV == "production" ? false : true;

const common = {
  context: path.join(__dirname, "client"),
  entry: {app: ["./js/app.js"]},
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader"
      }
    ]
  },

  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.min.js",
  },
};

const dev = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const prod = {

}

module.exports = merge(common, DEV ? dev : prod);

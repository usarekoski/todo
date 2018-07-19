const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");

const DEV = process.env.NODE_ENV == "production" ? false : true;

const common = {
  entry: {
    app: ["./client/js/app"]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        query: {
          configFile: 'tsconfig.client.json',
          onlyCompileBundledFiles: true,
        }
      },
    ]
  },

  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.min.js",
  },
};

const dev = {
  mode: 'development',
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
}

const prod = {
  mode: 'production',
}

module.exports = merge(common, DEV ? dev : prod);

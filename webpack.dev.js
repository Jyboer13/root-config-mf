const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "auto",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    compress: true,
    port: 8081,
    historyApiFallback: true,
  },
});

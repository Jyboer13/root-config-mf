const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "build.[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "auto",
  },
});

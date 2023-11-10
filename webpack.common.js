const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve("@svgr/webpack"),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve("file-loader"),
            options: {
              name: "svg/[name].[hash].[ext]",
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "build.[contenthash].css",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new ModuleFederationPlugin({
      name: "root",
      remotes: {
        ChessModule: "ChessModule@http://localhost:8080/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          version: "^18.2.0",
        },
        "react-dom": {
          singleton: true,
          version: "^18.2.0",
        },
      },
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = ["development", "test", "e2e"].includes(
  process.env.NODE_ENV || "development"
);

const initialEntryPoints = isDevelopment ? ["webpack-hot-middleware/client?reload=true"] : [];

module.exports = {
  entry: [...initialEntryPoints, path.join(__dirname, "./src/main.js")],
  context: path.resolve(__dirname),
  devtool: isDevelopment ? "source-map" : false,
  mode: isDevelopment ? "development" : "production",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Engage",
      template: path.join(__dirname, "public/index.template.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          configFile: path.resolve(__dirname, "babel.config.js"), // Explicitly specify Babel config file
          cacheDirectory: true, // Enable caching for faster rebuilds
          sourceMaps: true, // Enable source maps for debugging
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
              esModule: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              // prefer Dart Sass (`sass` package) over deprecated node-sass
              implementation: require('sass')
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              // prefer Dart Sass (`sass` package) over deprecated node-sass
              implementation: require('sass')
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: path.resolve(__dirname, "../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
    },
  },
  output: {
    path: path.resolve(__dirname, "../server/public/dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    historyApiFallback: true,
    port: 3000,
    publicPath: "/dist/", // Ensure alignment with output.publicPath
    hot: true, // Changed from hotOnly to hot
    proxy: [
      {
        context: ["/auth", "/api"],
        target: "http://localhost:4000",
      },
    ],
  },
};

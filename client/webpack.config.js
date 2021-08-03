const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      { test: /\.tsx?$/, 
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: ['/node_modules'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ], 
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|jpg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/../src',
            name: '[name].[ext]?[hash]',
          }
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },

  optimization: { minimize: true },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js', '.json', '.scss'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@src': path.resolve(__dirname, 'src'),
    }
  },
  output: { 
    path: path.join(__dirname, './dist'), 
    filename: '[name].js',
  },
  devtool: 'source-map',
};
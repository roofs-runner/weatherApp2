const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      test  : /\.scss$/,
      loader: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader',
          use  : [
            {
              loader : 'css-loader',
              options: {
                sourceMap      : true,
                minimize       : true,
                discardComments: {
                  removeAll: true
                }
              }
            },
            {
              loader : 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new ExtractTextPlugin("style.css"),

    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
    })
  ]
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/client/index.js'],
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name : 'assets/img/[name].[ext]'
                }
            }
        ]
    }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080/'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ]
};
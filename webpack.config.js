const webpack = require('webpack');

module.exports = {
    entry: ['./front_src/App.jsx'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      path: __dirname + '/static',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './static',
      hot : true
    }
  };

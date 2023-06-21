const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
   name: 'tictactoe-setting',
   mode: 'development',
   devtool: 'eval',
   resolve: {
      extensions: ['.js', '.jsx']
   },
   entry: {
      app: ['./client.jsx'],
   },
   module: {
      rules: [{
         test: /\.jsx?/,
         loader: 'babel-loader',
         options: {
            presets: [
               ['@babel/preset-env', {
                  targets: {
                     browsers: ['> 1% in KR', 'last 2 chrome versions'],
                  }, // targets
                  debug: true,
               }], //presets inner
               '@babel/preset-react'
            ],
            plugins: [
               '@babel/plugin-proposal-class-properties',
               'react-refresh/babel'
            ], // plugins
         }, //option
      }] // rules
   }, // module
   plugins: [
      new RefreshWebpackPlugin()
   ], // 확장프로그램 개념이다.
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
      publicPath: '/dist/'
   }, //출력
   devServer: {
      devMiddleware: {
         publicPath: '/dist/'
      },
      static: {
         directory: path.resolve(__dirname)
      },
      hot: true,
   },
} // module.exports
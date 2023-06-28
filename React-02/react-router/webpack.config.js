const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
   name: 'MineSweeper-setting',
   mode: 'development',
   devtool: 'eval',
   resolve: {
      extensions: ['.js', '.jsx'],
   },
   entry: {
      app: ['./client'],
   }, // entry, 입력
   module: {
      rules: [{
         test: /\.jsx?/,
         loader: 'babel-loader',
         options: {
            presets: [
               ['@babel/preset-env', {
                  targets: {
                     browsers: ['> 1% in KR'],
                  }, // targets
               }],
               '@babel/preset-react'
            ], // presets
            plugins: [
               '@babel/plugin-proposal-class-properties',
               'react-refresh/babel'
            ],
         }, // option
      }], //rules
   }, // module
   plugins: [
      new RefreshWebpackPlugin()
   ],
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
      publicPath: '/dist/'
   }, // 출력, output
   devServer: {
      devMiddleware: {
         publicPath: '/dist/'
      },
      static: {
         directory: path.resolve(__dirname),
      },
   },
} // module.export